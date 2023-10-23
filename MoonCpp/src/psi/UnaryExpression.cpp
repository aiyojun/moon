#include "UnaryExpression.h"

std::string UnaryExpression::toString() {
    std::string s;
    if (_prefix)
        s.append(_operator).append(" ");
    s.append(_argument->toString());
    if (!_prefix)
        s.append(_operator).append(" ");
    return s;
}

void UnaryExpression::setArgument(Expression *e) {
    _argument = e;// if (e) e->relate(this);
}

PsiElement *UnaryExpression::mount() {
    if (_argument) {
        _argument->mount();
        _argument->relate(this);
    }
    return this;
}

json UnaryExpression::toJson() {
    json nil{{"nil", nullptr}};
    return {
            {"type", "UnaryExpression"},
            {"prefix", _prefix},
            {"operator", _operator},
            {"argument", _argument ? _argument->toJson() : nil["nil"]}
    };
}

nlohmann::json UnaryExpression::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "UnaryExpression";
    return _j;
}
