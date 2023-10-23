#ifndef MOONCPP_BREAKSTATEMENT_H
#define MOONCPP_BREAKSTATEMENT_H

#include "Statement.h"

class BreakStatement : public Statement {
public:
    json toJson() override;

    nlohmann::json toJsonTree() override;
};

#endif //MOONCPP_BREAKSTATEMENT_H
