#include "CallExpression.h"

void CallExpression::setCallee(Expression *callee) {
    _callee = callee;
}

std::string CallExpression::toString() {
    std::string s;
    s.append(_callee->toString());
    s.append(" (");
    for (int i = 0; i < _arguments.size(); i++) {
        auto arg = _arguments[i];
        if (i) s.append(", ");
        s.append(arg->toString());
    }
    s.append(" )");
    return s;
}

PsiElement *CallExpression::mount() {
    if (_callee) _callee->mount();
    if (_callee) _callee->relate(this);
    for (const auto &item: _arguments) {
        item->mount();
        item->relate(this);
    }
    return this;
}

json CallExpression::toJson() {
    auto nil = json({{"nil", nullptr}});
    auto arr = json::array();
    for (const auto &item: _arguments) {
        arr.emplace_back(item->toJson());
    }
    return {
            {"type", "CallExpression"},
            {"callee", _callee ? _callee->toJson() : nil["nil"]},
            {"arguments", arr}
    };
}

nlohmann::json CallExpression::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "CallExpression";
    return _j;
}
