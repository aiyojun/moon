#include "PsiBuilder.h"
#include "PsiUtils.h"
#include "Literal.h"
#include "SyntaxError.h"
#include "MoonCompileErrorListener.h"
#include "../types.h"

using namespace antlr4;

void PsiBuilder::compile(const std::string &path) {
    std::ifstream stream;
    stream.open(path);
    ANTLRInputStream input(stream);
    MoonLexer lexer(&input);
    CommonTokenStream tokens(&lexer);
    MoonParser parser(&tokens);
    parser.removeErrorListeners();
    parser.addErrorListener(new MoonCompileErrorListener);
    try {
        _program = handleProgram(parser.program());
    } catch (std::exception& e) {
        std::cerr << e.what() << std::endl;
    }
}

Program *PsiBuilder::handleProgram(MoonParser::ProgramContext *tree) {
    auto _r = new Program;
    unfoldDeclarations(_r->getBody(), tree->declarations());
    return _r;
}

Declaration *PsiBuilder::handleMember(MoonParser::MemberContext *tree) {
    if (tree->variableDeclaration()) {
        return handleVariableDeclaration(tree->variableDeclaration());
    }
    if (tree->functionDeclaration()) {
        return handleFunctionDeclaration(tree->functionDeclaration());
    }
    throw SyntaxError("");
}

ClassDeclaration *PsiBuilder::handleClassDeclaration(MoonParser::ClassDeclarationContext *tree) {
    auto _r = new ClassDeclaration;
    std::vector<Declaration *> vec;
    unfoldMembers(vec, tree->members());
    for (Declaration* m : vec) {
        std::cout << "[LANG] instanceof<VariableDeclaration *>(m) : "
                  << (instanceof<VariableDeclaration *>(m) ? "true" : "false") << std::endl;
        if (instanceof<VariableDeclaration *>(m)) {
            _r->getVariables().emplace_back(dynamic_cast<VariableDeclaration *>(m));
        } else if (instanceof<FunctionDeclaration *>(m)) {
            _r->getMethods().emplace_back(dynamic_cast<FunctionDeclaration *>(m));
        }
    }
    return _r;
}

VariableDeclaration *PsiBuilder::handleVariableDeclaration(MoonParser::VariableDeclarationContext *tree) {
    auto _r = new VariableDeclaration;
    _r->setId(handleIdentifier(tree->ID()));
    _r->setInit(handleExpression(tree->expression()));
    return _r;
}

FunctionDeclaration *PsiBuilder::handleFunctionDeclaration(MoonParser::FunctionDeclarationContext *tree) {
    auto _r = new FunctionDeclaration;
    _r->setId(handleIdentifier(tree->ID()));
    if (tree->params())
        this->unfoldParams(_r->getParams(), tree->params());
    _r->setBody(handleBlockStatement(tree->blockStatement()));
    return _r;
}

IfStatement *PsiBuilder::handleIfStatement(MoonParser::IfStatementContext *tree) {
    std::vector<IfStatement*> ifStmt;
    this->unfoldMultiIfStatement(ifStmt, tree->multiIfStatement());
    int idx = 1;
    while (idx < ifStmt.size()) {
        ifStmt[idx - 1]->setAlternate(ifStmt[idx]);
        idx++;
    }
    if (tree->elseStatement()->blockStatement()) {
        ifStmt[idx - 1]->setAlternate(handleBlockStatement(tree->elseStatement()->blockStatement()));
    }
    return nullptr;
}

ForStatement *PsiBuilder::handleForStatement(MoonParser::ForStatementContext *tree) {
    auto isNumeric = !tree->SEMI().empty();
    if (isNumeric) {
        auto _r = new ForStatement;
        int acc = 0, j;
        for (int i = 0; i < tree->children.size(); i++) {
            auto p = tree->children[i];
            if (!PsiUtils::isTermOf(p, MoonLexer::SEMI))
                continue;
            j = i - 1;
            if (acc == 0) {
                if (j > -1 && PsiUtils::isExpressionContext(tree->children[j]))
                    _r->setInit(handleExpression(dynamic_cast<MoonParser::ExpressionContext *>(tree->children[j])));
            } else if (acc == 1) {
                if (PsiUtils::isExpressionContext(tree->children[j]))
                    _r->setTest(handleExpression(dynamic_cast<MoonParser::ExpressionContext *>(tree->children[j])));
                j = i + 1;
                if (j < tree->children.size() && PsiUtils::isExpressionContext(tree->children[j]))
                    _r->setUpdate(handleExpression(dynamic_cast<MoonParser::ExpressionContext *>(tree->children[j])));
            }
            acc++;
        }
        return _r;
    }
    return nullptr;
}

WhileStatement *PsiBuilder::handleWhileStatement(MoonParser::WhileStatementContext *tree) {
    auto _r = new WhileStatement;
    _r->setTest(handleExpression(tree->expression()));
    _r->setBody(handleBlockStatement(tree->blockStatement()));
    return _r;
}

TryStatement *PsiBuilder::handleTryStatement(MoonParser::TryStatementContext *tree) {
    return nullptr;
}

ReturnStatement *PsiBuilder::handleReturnStatement(MoonParser::ReturnStatementContext *tree) {
    auto _r = new ReturnStatement;
    if (tree->expression()) {
        _r->setArgument(handleExpression(tree->expression()));
    }
    return _r;
}

ContinueStatement *PsiBuilder::handleContinueStatement(MoonParser::ContinueStatementContext *tree) {
    return new ContinueStatement;
}

BreakStatement *PsiBuilder::handleBreakStatement(MoonParser::BreakStatementContext *tree) {
    return new BreakStatement;
}

ThrowStatement *PsiBuilder::handleThrowStatement(MoonParser::ThrowStatementContext *tree) {
    auto _r = new ThrowStatement;
    if (tree->expression()) {
        _r->setArgument(handleExpression(tree->expression()));
    }
    return _r;
}

BlockStatement *PsiBuilder::handleBlockStatement(MoonParser::BlockStatementContext *tree) {
    auto _r = new BlockStatement;
    unfoldStatements(_r->getBody(), tree->statements());
    return _r;
}

Expression *PsiBuilder::handleExpression(MoonParser::ExpressionContext *tree) {
    if (PsiUtils::isExpressionContext(tree->children[0])) {
        if (tree->children.size() == 3) {
            auto mid = tree->children[1];
            if (PsiUtils::isTerm(mid) && mid->getText() == "=") {
                return handleAssignmentExpression(tree);
            } else {
                return handleBinaryExpression(tree);
            }
        } else {
            // TODO: ternary operator
            return nullptr;
        }
    } else {
        if (tree->ID()) {
            return handleAccessExpression(tree);
        } else if (tree->children.size() == 1) {
            return handleTerminal(dynamic_cast<TerminalNode *>(tree->children[0]));
        } else {
            return handleUnaryExpression(tree);
        }
    }
}

Expression *PsiBuilder::handleAccessExpression(MoonParser::ExpressionContext *tree) {
    Expression *_r = nullptr;
    if (PsiUtils::isTerm(tree->children[0]) && tree->children[0]->getText() == "new") {
        auto obj = new NewExpression;
        obj->setCallee(handleIdentifier(tree->ID()));
        _r = obj;
    } else if (PsiUtils::isTermOf(tree->children[0], MoonLexer::ID)) {
        _r = handleIdentifier(tree->ID());
    } else {
        _r = handleExpression(tree->expression(0));
    }
    if (tree->accessExpression()) {
        std::vector<Expression *> vec;
        unfoldAccessExpression(vec, tree->accessExpression());
        auto p = _r;
        int idx = 0;
        while (idx < vec.size()) {
            if (instanceof<CallExpression*>(vec[idx])) {
                dynamic_cast<CallExpression*>(vec[idx])->setCallee(p);
            } else if (instanceof<DynamicMemberExpression*>(vec[idx])) {
                dynamic_cast<DynamicMemberExpression*>(vec[idx])->setObject(p);
            } else if (instanceof<MemberExpression*>(vec[idx])) {
                dynamic_cast<MemberExpression*>(vec[idx])->setObject(p);
            }
            p = vec[idx];
            idx++;
        }
        _r = vec.back();
    }
    return _r;
}

AssignmentExpression *PsiBuilder::handleAssignmentExpression(MoonParser::ExpressionContext *tree) {
    auto _r = new AssignmentExpression;
    _r->setLeft(handleExpression(tree->expression(0)));
    _r->setRight(handleExpression(tree->expression(1)));
    return _r;
}

BinaryExpression *PsiBuilder::handleBinaryExpression(MoonParser::ExpressionContext *tree) {
    auto _r = new BinaryExpression;
    _r->setOperator(tree->children[1]->getText());
    _r->setLeft(handleExpression(tree->expression(0)));
    _r->setRight(handleExpression(tree->expression(1)));
    return _r;
}

UnaryExpression *PsiBuilder::handleUnaryExpression(MoonParser::ExpressionContext *tree) {
    auto _r = new UnaryExpression;
    if (PsiUtils::isExpressionContext(tree->children[1])) {
        _r->setPrefix(true);
        _r->setOperator(tree->children[0]->getText());
    } else {
        _r->setPrefix(false);
        _r->setOperator(tree->children[1]->getText());
    }
    _r->setArgument(handleExpression(tree->expression(0)));
    return _r;
}

void PsiBuilder::unfoldDeclarations(std::vector<Declaration *> &vec, MoonParser::DeclarationsContext *tree) {
    if (!tree->declarations().empty()) {
        for (int i = 0; i < 2; i++)
            unfoldDeclarations(vec, tree->declarations(i));
        return;
    }
    if (tree->classDeclaration()) {
        vec.emplace_back(handleClassDeclaration(tree->classDeclaration()));
        return;
    }
    if (tree->functionDeclaration()) {
        vec.emplace_back(handleFunctionDeclaration(tree->functionDeclaration()));
        return;
    }
    if (tree->variableDeclaration()) {
        vec.emplace_back(handleVariableDeclaration(tree->variableDeclaration()));
        return;
    }
}

void PsiBuilder::unfoldMembers(std::vector<Declaration *> &vec, MoonParser::MembersContext *tree) {
    if (!tree->members().empty()) {
        for (int i = 0; i < 2; i++)
            unfoldMembers(vec, tree->members(i));
        return;
    }
    if (tree->member()) {
        vec.emplace_back(handleMember(tree->member()));
        return;
    }
}

void PsiBuilder::unfoldParams(std::vector<Identifier *> &vec, MoonParser::ParamsContext *tree) {
    if (!tree->params().empty()) {
        for (auto param : tree->params())
            unfoldParams(vec, param);
        return;
    }
    vec.emplace_back(handleIdentifier(tree->ID()));
}

void PsiBuilder::unfoldStatements(std::vector<Statement *> &vec, MoonParser::StatementsContext *tree) {
    if (!tree->statements().empty()) {
        for (int i = 0; i < 2; i++)
            unfoldStatements(vec, tree->statements(i));
        return;
    }
    if (tree->expression()) {
        vec.emplace_back(handleExpression(tree->expression()));
        return;
    }
    if (tree->ifStatement()) {
        vec.emplace_back(handleIfStatement(tree->ifStatement()));
        return;
    }
    if (tree->forStatement()) {
        vec.emplace_back(handleForStatement(tree->forStatement()));
        return;
    }
    if (tree->whileStatement()) {
        vec.emplace_back(handleWhileStatement(tree->whileStatement()));
        return;
    }
    if (tree->tryStatement()) {
        vec.emplace_back(handleTryStatement(tree->tryStatement()));
        return;
    }
    if (tree->returnStatement()) {
        vec.emplace_back(handleReturnStatement(tree->returnStatement()));
        return;
    }
    if (tree->continueStatement()) {
        vec.emplace_back(handleContinueStatement(tree->continueStatement()));
        return;
    }
    if (tree->breakStatement()) {
        vec.emplace_back(handleBreakStatement(tree->breakStatement()));
        return;
    }
    if (tree->throwStatement()) {
        vec.emplace_back(handleThrowStatement(tree->throwStatement()));
        return;
    }
    if (tree->blockStatement()) {
        vec.emplace_back(handleBlockStatement(tree->blockStatement()));
        return;
    }
}

void PsiBuilder::unfoldMultiIfStatement(std::vector<IfStatement *> &vec, MoonParser::MultiIfStatementContext *tree) {
    if (!tree->multiIfStatement().empty()) {
        for (auto x : tree->multiIfStatement()) {
            unfoldMultiIfStatement(vec, x);
        }
        return;
    }
    auto _r = new IfStatement;
    _r->setTest(handleExpression(tree->expression()));
    _r->setConsequent(handleBlockStatement(tree->blockStatement()));
    vec.emplace_back(_r);
}

Identifier *PsiBuilder::handleIdentifier(TerminalNode *tree) {
    auto identifier = Identifier::build(tree->getText());
    identifier->loc(tree);
    return identifier;
}

TerminalExpression *PsiBuilder::handleTerminal(TerminalNode *tree) {
    if (tree->getSymbol()->getType() == MoonLexer::ID) {
        return handleIdentifier(tree);
    } else {
        return Literal::build(tree);
    }
}

void PsiBuilder::unfoldAccessExpression(std::vector<Expression *> &vec, MoonParser::AccessExpressionContext *tree) {
    if (!tree->accessExpression().empty()) {
        for (auto x : tree->accessExpression()) {
            unfoldAccessExpression(vec, x);
        }
        return;
    }
    if (tree->children[0]->getText() == ".") {
        auto _r = new MemberExpression;
        _r->setProperty(handleIdentifier(tree->ID()));
        vec.emplace_back(_r);
        return;
    }
    if (tree->children[0]->getText() == "(") {
        auto _r = new CallExpression;
        if (tree->arguments()) {
            unfoldArguments(_r->getArguments(), tree->arguments());
        }
        vec.emplace_back(_r);
        return;
    }
    if (tree->children[0]->getText() == "[") {
        auto _r = new DynamicMemberExpression;
        _r->setProperty(handleExpression(tree->expression()));
        vec.emplace_back(_r);
        return;
    }
}

void PsiBuilder::unfoldArguments(std::vector<Expression*>& vec, MoonParser::ArgumentsContext* tree) {
    if (!tree->arguments().empty()) {
        for (auto x : tree->arguments()) {
            unfoldArguments(vec, x);
        }
        return;
    }
    vec.emplace_back(handleExpression(tree->expression()));
}





