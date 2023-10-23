#include "DynamicMemberExpression.h"

json DynamicMemberExpression::toJson() {
    auto j = MemberExpression::toJson();
    j["type"] = "DynamicMemberExpression";
    return j;
}

nlohmann::json DynamicMemberExpression::toJsonTree() {
    auto j = MemberExpression::toJsonTree();
    j["type"] = "DynamicMemberExpression";
    return j;
}
