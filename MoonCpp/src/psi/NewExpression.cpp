#include "NewExpression.h"

void NewExpression::setCallee(Identifier *callee) {
    _callee = callee; //_callee->relate(this);
}

PsiElement *NewExpression::mount() {
    if (_callee) _callee->mount();
    if (_callee) _callee->relate(this);
    for (const auto &item: _arguments) {
        item->mount();
        item->relate(this);
    }
    return this;
}

json NewExpression::toJson() {
    json nil{{"nil", nullptr}};
    auto arr = json::array();
    for (const auto &item: _arguments) {
        arr.emplace_back(item->toJson());
    }
    return {
            {"type", "NewExpression"},
            {"callee", _callee ? _callee->toJson() : nil["nil"]},
            {"arguments", arr}
    };
}

nlohmann::json NewExpression::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "NewExpression";
    return _j;
}
