#ifndef MOONCPP_EVALUATOR_H
#define MOONCPP_EVALUATOR_H

#include "Expression.h"
#include "Literal.h"
#include "AssignmentExpression.h"
#include "CallExpression.h"
#include "UnaryExpression.h"
#include "BinaryExpression.h"
#include "PsiElementTraverser.h"

class MoonScriptEngine;

class Evaluator {
public:
    explicit Evaluator(MoonScriptEngine *engine);

    Literal* evaluate(Expression* expr);

private:
    Literal* handleAssignmentExpression(AssignmentExpression* expr);

    Literal* handleCallExpression(CallExpression* expr);

    Literal* handleUnaryExpression(UnaryExpression* expr);

    Literal* handleBinaryExpression(BinaryExpression* expr);

private:
    MoonScriptEngine* _engine;
};


#endif //MOONCPP_EVALUATOR_H
