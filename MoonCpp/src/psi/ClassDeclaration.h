#ifndef MOONCPP_CLASSDECLARATION_H
#define MOONCPP_CLASSDECLARATION_H

#include "Declaration.h"
#include "Identifier.h"

class VariableDeclaration;

class FunctionDeclaration;

class ClassDeclaration : public Declaration {
public:
    void setId(Identifier *id);

    Identifier *getId() { return _id; }

    std::vector<VariableDeclaration *> &getVariables() { return _variables; }

    std::vector<FunctionDeclaration *> &getMethods() { return _methods; }

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Identifier *_id;

    std::vector<VariableDeclaration *> _variables;

    std::vector<FunctionDeclaration *> _methods;
};


#endif //MOONCPP_CLASSDECLARATION_H
