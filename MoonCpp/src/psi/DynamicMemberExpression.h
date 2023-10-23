#ifndef MOONCPP_DYNAMICMEMBEREXPRESSION_H
#define MOONCPP_DYNAMICMEMBEREXPRESSION_H

#include "MemberExpression.h"

class DynamicMemberExpression : public MemberExpression {
public:
    json toJson() override;

    nlohmann::json toJsonTree() override;
};

#endif //MOONCPP_DYNAMICMEMBEREXPRESSION_H
