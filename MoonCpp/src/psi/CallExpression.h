#ifndef MOONCPP_CALLEXPRESSION_H
#define MOONCPP_CALLEXPRESSION_H

#include "Expression.h"

class CallExpression : public Expression {
public:
    void setCallee(Expression *callee);

    Expression *getCallee() { return _callee; }

    std::vector<Expression *> &getArguments() { return _arguments; }

    std::string toString() override;

private:
    std::vector<Expression *> _arguments;

    Expression *_callee = nullptr;
};


#endif //MOONCPP_CALLEXPRESSION_H
