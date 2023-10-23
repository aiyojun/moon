#include "Program.h"
#include "Declaration.h"

PsiElement *Program::mount() {
    for (const auto &item: _body) {
        item->mount();
        item->relate(this);
    }
    return this;
}

json Program::toJson() {
    auto arr = json::array();
    for (const auto &item: _body) {
        arr.emplace_back(item->toJson());
    }
    return {
            {"type", "Program"},
            {"body", arr}
    };
}

nlohmann::json Program::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "Program";
    return _j;
}
