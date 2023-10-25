#ifndef MOONCPP_BYTECODECOMPILER_H
#define MOONCPP_BYTECODECOMPILER_H

#include <string>
#include <utility>
#include "Expression.h"
#include "FunctionDeclaration.h"
#include "Literal.h"
#include "IfStatement.h"
#include "BreakStatement.h"
#include "ContinueStatement.h"
#include "WhileStatement.h"
#include "ForStatement.h"
#include "ReturnStatement.h"
#include "Evaluation.h"

class Bytecode {
public:
    virtual std::string toString() = 0;
};

class BtcGoto : public Bytecode {
public:
    explicit BtcGoto(std::string label) : _tag(std::move(label)) {}

    std::string toString() override { return "goto " + _tag; }

    void setTag(const std::string &tag) { _tag = tag; }

    const std::string &getTag() { return _tag; }

private:
    std::string _tag;
};

class BtcTest : public Bytecode {
public:
    BtcTest(std::string label, Expression *e) : _tag(std::move(label)), _expression(e) {}

    void setExpression(Expression *e) { _expression = e; }

    void setTag(const std::string &tag) { _tag = tag; }

    Expression *getExpression() { return _expression; }

    const std::string &getTag() { return _tag; }

    std::string toString() override { return "goto " + _tag + ", test " + _expression->toString(); }

private:
    Expression *_expression = nullptr;

    std::string _tag;
};

class BtcEval : public Bytecode {
public:
    explicit BtcEval(Expression *e) : _expression(e) {}

    void setExpression(Expression *e) { _expression = e; }

    Expression *getExpression() { return _expression; }

    std::string toString() override { return "eval " + _expression->toString(); }

private:
    Expression *_expression = nullptr;
};

class BtcRet : public Bytecode {
public:
    explicit BtcRet(Expression *e) : _expression(e) {}

    void setExpression(Expression *e) { _expression = e; }

    Expression *getExpression() { return _expression; }

    std::string toString() override { return "ret " + _expression->toString(); }

private:
    Expression *_expression = nullptr;
};

class BtcMark : public Bytecode {
public:
    explicit BtcMark(std::string label) : _tag(std::move(label)) {}

    std::string toString() override { return _tag + ":"; }

    void setTag(const std::string &tag) { _tag = tag; }

    const std::string &getTag() { return _tag; }

private:
    std::string _tag;
};

class Evaluator;

class BytecodeCompiler {
public:
    BytecodeCompiler();

    void compile(FunctionDeclaration *func);

    std::shared_ptr<IValue> interpret(Evaluation *evaluator);

private:
    Bytecode *next();

    void optimize();

    void handleIfStatement(IfStatement *stmt);

    void handleBlockStatement(BlockStatement *stmts);

    void handleWhileStatement(WhileStatement *stmt);

    void handleForStatement(ForStatement *stmt);

    void handleBreakStatement(BreakStatement *stmt);

    void handleContinueStatement(ContinueStatement *stmt);

    void handleReturnStatement(ReturnStatement *stmt);

    void emitTest(const std::string &label, Expression *expr);

    void emitEval(Expression *expr);

    void emitGoto(const std::string &label);

    void emitMark(const std::string &label);

    void emitRet(Expression *expr);

    std::map<std::string, std::string> *findLastLoop();

    std::vector<std::string> labels(int n = 1);

private:
    std::vector<Bytecode *> _bytecodes;

    std::vector<std::map<std::string, std::string>> _stack;

    std::map<std::string, int> _lblIdxInUsing;

    static int _lblCount;

    int _csip;
};

#endif //MOONCPP_BYTECODECOMPILER_H
