#ifndef MOONCPP_CONTINUESTATEMENT_H
#define MOONCPP_CONTINUESTATEMENT_H

#include "Statement.h"

class ContinueStatement : public Statement {
public:
    json toJson() override;

    nlohmann::json toJsonTree() override;
};

#endif //MOONCPP_CONTINUESTATEMENT_H
