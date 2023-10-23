#include "ContinueStatement.h"

json ContinueStatement::toJson() {
    return {
            {"type", "ContinueStatement"}
    };
}

nlohmann::json ContinueStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "ContinueStatement";
    return _j;
}
