#include "ClassDeclaration.h"
#include "VariableDeclaration.h"
#include "FunctionDeclaration.h"

void ClassDeclaration::setId(Identifier *id) {
    _id = id;// _id->relate(this);
}

PsiElement *ClassDeclaration::mount() {
    _id->relate(this);
    _id->mount();
    for (auto item: _variables) {
        item->mount();
        item->relate(this);
    }
    for (auto item: _methods) {
        item->mount();
        item->relate(this);
    }
    return this;
}

json ClassDeclaration::toJson() {
    auto variables = json::array();
    auto methods = json::array();
    for (const auto &item: _variables) {
        variables.emplace_back(item->toJson());
    }
    for (const auto &item: _methods) {
        methods.emplace_back(item->toJson());
    }
    return {
            {"type", "ClassDeclaration"},
            {"id", _id->toJson()},
            {"variables", variables},
            {"methods", methods},
    };
}

nlohmann::json ClassDeclaration::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "ClassDeclaration";
    return _j;
}
