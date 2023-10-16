#ifndef MOONCPP_BINARYEXPRESSION_H
#define MOONCPP_BINARYEXPRESSION_H

#include "Expression.h"

class BinaryExpression : public Expression {
public:
    void setLeft(Expression *left);

    void setRight(Expression *right);

    void setOperator(const std::string &op) { _operator = op; }

    const std::string &getOperator() { return _operator; }

    Expression *getLeft() { return _left; }

    Expression *getRight() { return _right; }

    std::string toString() override;

private:
    std::string _operator;

    Expression *_left = nullptr;

    Expression *_right = nullptr;
};


#endif //MOONCPP_BINARYEXPRESSION_H
