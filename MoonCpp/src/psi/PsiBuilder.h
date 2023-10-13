#ifndef MOONCPP_PSIBUILDER_H
#define MOONCPP_PSIBUILDER_H

#include "antlr4-runtime.h"
#include "PsiUtils.h"
#include "Program.h"
#include "MoonParser.h"
#include "MoonLexer.h"
#include "VariableDeclaration.h"
#include "FunctionDeclaration.h"
#include "IfStatement.h"
#include "WhileStatement.h"
#include "ForStatement.h"
#include "ReturnStatement.h"
#include "ContinueStatement.h"
#include "BreakStatement.h"
#include "MemberExpression.h"
#include "ParseTreeTraverser.h"
#include "Identifier.h"
#include "TerminalExpression.h"

class PsiBuilder : public ParseTreeTraverser {
public:
    PsiBuilder(): _program(nullptr) {}

    Program* getProgram() {return _program;}

    void compile(const std::string& text);

protected:
    bool onBefore(antlr4::tree::ParseTree *tree) override;

    void onAfter(antlr4::tree::ParseTree *tree) override;

private:
    Program* handleProgram(MoonParser::ProgramContext* tree);

    Declaration* handleMember(MoonParser::MemberContext* tree);

    VariableDeclaration* handleVariableDeclaration(MoonParser::VariableDeclarationContext* tree);

    FunctionDeclaration* handleFunctionDeclaration(MoonParser::FunctionDeclarationContext* tree);

    std::vector<Statement*> handleStatements(MoonParser::StatementsContext* tree);

    IfStatement* handleIfStatement(MoonParser::IfStatementContext* tree);

    ForStatement* handleIfStatement(MoonParser::ForStatementContext* tree);

    WhileStatement* handleIfStatement(MoonParser::WhileStatementContext* tree);

    ReturnStatement* handleIfStatement(MoonParser::ReturnStatementContext* tree);

    ContinueStatement* handleContinueStatement(MoonParser::ContinueStatementContext* tree);

    BreakStatement* handleBreakStatement(MoonParser::BreakStatementContext* tree);

    BlockStatement* handleBlockStatement(MoonParser::BlockStatementContext* tree);

    Expression* handleExpression(MoonParser::ExpressionContext* tree);

    Identifier* handleIdentifier(TerminalNode* tree);

    TerminalExpression* handleTerminal(TerminalNode* tree);

private:
    Program* _program;
};


#endif //MOONCPP_PSIBUILDER_H
