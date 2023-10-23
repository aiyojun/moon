#include "FunctionDeclaration.h"

void FunctionDeclaration::setId(Identifier *id) {
    _id = id;// id->relate(this);
}

void FunctionDeclaration::setBody(BlockStatement *b) {
    _body = b;// b->relate(this);
}

PsiElement *FunctionDeclaration::mount() {
    _id->mount();
    _id->relate(this);
    for (const auto &item: _params) {
        item->mount();
        item->relate(this);
    }
    _body->mount();
    _body->relate(this);
    return this;
}

json FunctionDeclaration::toJson() {
    auto arr = json::array();
    for (const auto &item: _params) {
        arr.emplace_back(item->toJson());
    }
    return {
            {"type", "FunctionDeclaration"},
            {"id", _id->toJson()},
            {"params", arr},
            {"body", _body->toJson()},
    };
}

nlohmann::json FunctionDeclaration::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "FunctionDeclaration";
    return _j;
}
