#include "MemberExpression.h"

void MemberExpression::setObject(Expression *e) {
    _object = e;
}

void MemberExpression::setProperty(Expression *e) {
    _property = e;
}

PsiElement *MemberExpression::mount() {
    if (_object) {
        _object->mount();
        _object->relate(this);
    }
    if (_property) _property->mount();
    return this;
}

json MemberExpression::toJson() {
    json nil{{"nil", nullptr}};
    return {
            {"type", "MemberExpression"},
            {"object", _object ? _object->toJson() : nil["nil"]},
            {"property", _property ? _property->toJson() : nil["nil"]},
    };
}

nlohmann::json MemberExpression::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "MemberExpression";
    return _j;
}
