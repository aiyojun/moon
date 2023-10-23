#ifndef MOONCPP_NEWEXPRESSION_H
#define MOONCPP_NEWEXPRESSION_H

#include "Expression.h"
#include "Identifier.h"

class NewExpression : public Expression {
public:
    void setCallee(Identifier *callee);

    std::vector<Expression *> &getArguments() { return _arguments; }

    Identifier *getCallee() { return _callee; }

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    std::vector<Expression *> _arguments;

    Identifier *_callee = nullptr;
};

#endif //MOONCPP_NEWEXPRESSION_H
