#include "BlockStatement.h"

PsiElement *BlockStatement::mount() {
    for (const auto &item: _body) {
        item->mount();
        item->relate(this);
    }
    return this;
}

json BlockStatement::toJson() {
    auto arr = json::array();
    for (const auto &item: _body) {
        arr.emplace_back(item->toJson());
    }
    return {
            {"type", "BlockStatement"},
            {"body", arr},
    };
}

nlohmann::json BlockStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "BlockStatement";
    return _j;
}
