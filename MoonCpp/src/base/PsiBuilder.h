#ifndef MOONCPP_PSIBUILDER_H
#define MOONCPP_PSIBUILDER_H

#include "psi.h"

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
