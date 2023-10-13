#include "BinaryExpression.h"

std::string BinaryExpression::toString() {
    return _left->toString() + " " + _operator + " " + _right->toString();
}

void BinaryExpression::setLeft(Expression *left) {
    _left = left; _left->relate(this);
}

void BinaryExpression::setRight(Expression *right) {
    _right = right; _right->relate(this);
}
