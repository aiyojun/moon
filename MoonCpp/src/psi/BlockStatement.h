#ifndef MOONCPP_BLOCKSTATEMENT_H
#define MOONCPP_BLOCKSTATEMENT_H

#include "Statement.h"

class BlockStatement : public Statement {
public:
    std::vector<Statement *> &getBody() { return _body; }

    PsiElement * mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    std::vector<Statement *> _body;
};

#endif //MOONCPP_BLOCKSTATEMENT_H
