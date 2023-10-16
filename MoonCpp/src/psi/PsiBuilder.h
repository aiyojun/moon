#ifndef MOONCPP_PSIBUILDER_H
#define MOONCPP_PSIBUILDER_H

#include "antlr4-runtime.h"
#include "PsiUtils.h"
#include "Program.h"
#include "MoonParser.h"
#include "MoonLexer.h"
#include "VariableDeclaration.h"
#include "FunctionDeclaration.h"
#include "Statements.h"
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
#include "DynamicMemberExpression.h"
#include "CallExpression.h"
#include "NewExpression.h"
#include "AssignmentExpression.h"
#include "BinaryExpression.h"
#include "UnaryExpression.h"
#include "ClassDeclaration.h"
#include "TryStatement.h"
#include "ThrowStatement.h"

class PsiBuilder {
public:
    PsiBuilder() : _program(nullptr) {}

    Program *getProgram() { return _program; }

    void compile(const std::string &path);

private:
    Program *handleProgram(MoonParser::ProgramContext *tree);

    Declaration *handleMember(MoonParser::MemberContext *tree);

    ClassDeclaration *handleClassDeclaration(MoonParser::ClassDeclarationContext *tree);

    VariableDeclaration *handleVariableDeclaration(MoonParser::VariableDeclarationContext *tree);

    FunctionDeclaration *handleFunctionDeclaration(MoonParser::FunctionDeclarationContext *tree);

    IfStatement *handleIfStatement(MoonParser::IfStatementContext *tree);

    ForStatement *handleForStatement(MoonParser::ForStatementContext *tree);

    WhileStatement *handleWhileStatement(MoonParser::WhileStatementContext *tree);

    TryStatement *handleTryStatement(MoonParser::TryStatementContext *tree);

    ReturnStatement *handleReturnStatement(MoonParser::ReturnStatementContext *tree);

    ContinueStatement *handleContinueStatement(MoonParser::ContinueStatementContext *tree);

    BreakStatement *handleBreakStatement(MoonParser::BreakStatementContext *tree);

    ThrowStatement *handleThrowStatement(MoonParser::ThrowStatementContext *tree);

    BlockStatement *handleBlockStatement(MoonParser::BlockStatementContext *tree);

    Expression *handleExpression(MoonParser::ExpressionContext *tree);

    Expression *handleAccessExpression(MoonParser::ExpressionContext *tree);

    AssignmentExpression *handleAssignmentExpression(MoonParser::ExpressionContext *tree);

    BinaryExpression *handleBinaryExpression(MoonParser::ExpressionContext *tree);

    UnaryExpression *handleUnaryExpression(MoonParser::ExpressionContext *tree);

    Identifier *handleIdentifier(TerminalNode *tree);

    TerminalExpression *handleTerminal(TerminalNode *tree);

private:
    void unfoldDeclarations(std::vector<Declaration *> &vec, MoonParser::DeclarationsContext *tree);

    void unfoldMembers(std::vector<Declaration *> &vec, MoonParser::MembersContext *tree);

    void unfoldParams(std::vector<Identifier *> &vec, MoonParser::ParamsContext *tree);

    void unfoldStatements(std::vector<Statement *> &vec, MoonParser::StatementsContext *tree);

    void unfoldMultiIfStatement(std::vector<IfStatement *> &vec, MoonParser::MultiIfStatementContext *tree);

    void unfoldAccessExpression(std::vector<Expression *> &vec, MoonParser::AccessExpressionContext *tree);

    void unfoldArguments(std::vector<Expression *> &vec, MoonParser::ArgumentsContext *tree);

private:
    Program *_program;
};


#endif //MOONCPP_PSIBUILDER_H
