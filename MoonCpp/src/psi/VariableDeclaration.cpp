#include "VariableDeclaration.h"

void VariableDeclaration::setId(Identifier *id) {
    _id = id;// id->relate(this);
}

void VariableDeclaration::setInit(Expression *e) {
    _init = e;// e->relate(this);
}

PsiElement *VariableDeclaration::mount() {
    _id->mount();
    _init->mount();
    _id->relate(this);
    _init->relate(this);
    return this;
}

json VariableDeclaration::toJson() {
    return {
            {"type", "VariableDeclaration"},
            {"id", _id->toJson()},
            {"init", _init->toJson()},
    };
}

nlohmann::json VariableDeclaration::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "VariableDeclaration";
    return _j;
}
