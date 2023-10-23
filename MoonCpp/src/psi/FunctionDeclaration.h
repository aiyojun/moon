#ifndef MOONCPP_FUNCTIONDECLARATION_H
#define MOONCPP_FUNCTIONDECLARATION_H

#include "Declaration.h"
#include "BlockStatement.h"
#include "Identifier.h"

class FunctionDeclaration : public Declaration {
public:
    void setId(Identifier *id);

    void setBody(BlockStatement *b);

    Identifier *getId() { return _id; }

    BlockStatement *getBody() { return _body; }

    std::vector<Identifier *> &getParams() { return _params; }

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Identifier *_id;

    BlockStatement *_body;

    std::vector<Identifier *> _params;
};


#endif //MOONCPP_FUNCTIONDECLARATION_H
