#include "PsiBuilder.h"
#include "PsiUtils.h"
#include "Literal.h"

void PsiBuilder::compile(const std::string &text) {

}

bool PsiBuilder::onBefore(antlr4::tree::ParseTree *tree) {
    if (PsiUtils::isProgramContext(tree)) {
        _program->loc(tree);
    }
    if (PsiUtils::isClassDeclarationContext(tree)) {
        auto identifiers = PsiUtils::findTerminals(tree->children, MoonLexer::ID);
        return true;
    }
    if (PsiUtils::isVariableDeclarationContext(tree)) {
        _program->getbody().emplace_back(handleVariableDeclaration(
            dynamic_cast<MoonParser::VariableDeclarationContext*>(tree)));
        return true;
    }
    if (PsiUtils::isFunctionDeclarationContext(tree)) {
        _program->getbody().emplace_back(handleFunctionDeclaration(
            dynamic_cast<MoonParser::FunctionDeclarationContext*>(tree)));
        return true;
    }
    return false;
}

void PsiBuilder::onAfter(antlr4::tree::ParseTree *tree) {

}


Program *PsiBuilder::handleProgram(MoonParser::ProgramContext *tree) {
    return nullptr;
}

Declaration *PsiBuilder::handleMember(MoonParser::MemberContext *tree) {
    return nullptr;
}

VariableDeclaration *PsiBuilder::handleVariableDeclaration(MoonParser::VariableDeclarationContext *tree) {


    return nullptr;
}

FunctionDeclaration *PsiBuilder::handleFunctionDeclaration(MoonParser::FunctionDeclarationContext *tree) {
    return nullptr;
}

std::vector<Statement *> PsiBuilder::handleStatements(MoonParser::StatementsContext *tree) {
    return std::vector<Statement *>();
}

IfStatement *PsiBuilder::handleIfStatement(MoonParser::IfStatementContext *tree) {
    return nullptr;
}

ForStatement *PsiBuilder::handleIfStatement(MoonParser::ForStatementContext *tree) {
    return nullptr;
}

WhileStatement *PsiBuilder::handleIfStatement(MoonParser::WhileStatementContext *tree) {
    return nullptr;
}

ReturnStatement *PsiBuilder::handleIfStatement(MoonParser::ReturnStatementContext *tree) {
    return nullptr;
}

ContinueStatement *PsiBuilder::handleContinueStatement(MoonParser::ContinueStatementContext *tree) {
    return nullptr;
}

BreakStatement *PsiBuilder::handleBreakStatement(MoonParser::BreakStatementContext *tree) {
    return nullptr;
}

BlockStatement *PsiBuilder::handleBlockStatement(MoonParser::BlockStatementContext *tree) {
    return nullptr;
}

Expression *PsiBuilder::handleExpression(MoonParser::ExpressionContext *tree) {
    return nullptr;
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
