#ifndef MOONCPP_ASSIGNMENTEXPRESSION_H
#define MOONCPP_ASSIGNMENTEXPRESSION_H

#include "Expression.h"

class AssignmentExpression : public Expression {
public:
    void setLeft(Expression *left);

    void setRight(Expression *right);

    Expression *getLeft() { return _left; }

    Expression *getRight() { return _right; }

    std::string toString() override;

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Expression *_left = nullptr;

    Expression *_right = nullptr;
};

#endif //MOONCPP_ASSIGNMENTEXPRESSION_H
