#include "AssignmentExpression.h"

void AssignmentExpression::setLeft(Expression *left) {
    _left = left; _left->relate(this);
}

void AssignmentExpression::setRight(Expression *right) {
    _right = right; _right->relate(this);
}

std::string AssignmentExpression::toString() {
    return _left->toString() + " = " + _right->toString();
}
