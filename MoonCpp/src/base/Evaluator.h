#ifndef MOONCPP_EVALUATOR_H
#define MOONCPP_EVALUATOR_H

#include "PsiElementTraverser.h"
#include "TerminalExpression.h"
#include "Literal.h"
#include "AssignmentExpression.h"
#include "CallExpression.h"
#include "BinaryExpression.h"
#include "UnaryExpression.h"
#include "MoonScriptEngine.h"

class Evaluator : public PsiElementTraverser {
public:
    explicit Evaluator(MoonScriptEngine *engine) : _engine(engine) {}

    Literal *evaluate(Expression *expr);

protected:
    bool onBefore(PsiElement *e) override;

    void onAfter(PsiElement *e) override;

private:
    Literal *handleAssignmentExpression(AssignmentExpression *expr, TerminalExpression *left, TerminalExpression *right);

    Literal *handleCallExpression(CallExpression *expr);

    Literal *handleUnaryExpression(UnaryExpression *expr, TerminalExpression *e);

    Literal *handleBinaryExpression(BinaryExpression *expr, TerminalExpression *left, TerminalExpression *right);

private:
    MoonScriptEngine *_engine;

    std::vector<TerminalExpression *> _stack;
};


#endif //MOONCPP_EVALUATOR_H
