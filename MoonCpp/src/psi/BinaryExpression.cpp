#include "BinaryExpression.h"

std::string BinaryExpression::toString() {
    return _left->toString() + " " + _operator + " " + _right->toString();
}

void BinaryExpression::setLeft(Expression *left) {
    _left = left;// _left->relate(this);
}

void BinaryExpression::setRight(Expression *right) {
    _right = right;// _right->relate(this);
}

PsiElement *BinaryExpression::mount() {
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

json BinaryExpression::toJson() {
    return {
            {"type", "BinaryExpression"},
            {"operator", _operator},
            {"left", _left->toJson()},
            {"right", _right->toJson()},
    };
}

nlohmann::json BinaryExpression::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "BinaryExpression";
    _j["operator"] = _operator;
    return _j;
}
