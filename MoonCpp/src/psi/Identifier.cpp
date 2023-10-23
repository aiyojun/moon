#include "Identifier.h"

Identifier *Identifier::build(const std::string &name) {
    auto identifier = new Identifier;
    identifier->setName(name);
    return identifier;
}

json Identifier::toJson() {
    return {
            {"type", "Identifier"},
            {"name", _name}
    };
}

nlohmann::json Identifier::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "Identifier";
    _j["name"] = _name;
    return _j;
}
