#include "BreakStatement.h"

json BreakStatement::toJson() {
    return {
            {"type", "BreakStatement"}
    };
}

nlohmann::json BreakStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "BreakStatement";
    return _j;
}
