#include "AssignmentExpression.h"

void AssignmentExpression::setLeft(Expression *left) {
    _left = left;// _left->relate(this);
}

void AssignmentExpression::setRight(Expression *right) {
    _right = right;// _right->relate(this);
}

std::string AssignmentExpression::toString() {
    return _left->toString() + " = " + _right->toString();
}

PsiElement *AssignmentExpression::mount() {
    if (_left) {
        _left->relate(this);
        _left->mount();
    }
    if (_right) {
        _right->relate(this);
        _right->mount();
    }
    return this;
}

json AssignmentExpression::toJson() {
    return {
            {"type", "AssignmentExpression"},
            {"left", _left->toJson()},
            {"right", _right->toJson()},
    };
}

nlohmann::json AssignmentExpression::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "AssignmentExpression";
    return _j;
}
