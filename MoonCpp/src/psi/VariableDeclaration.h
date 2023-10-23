#ifndef MOONCPP_VARIABLEDECLARATION_H
#define MOONCPP_VARIABLEDECLARATION_H

#include "Declaration.h"
#include "Expression.h"
#include "Identifier.h"

class VariableDeclaration : public Declaration {
public:
    void setId(Identifier *id);

    void setInit(Expression *e);

    Identifier *getId() { return _id; }

    Expression *getInit() { return _init; }

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Identifier *_id = nullptr;

    Expression *_init = nullptr;
};


#endif //MOONCPP_VARIABLEDECLARATION_H
