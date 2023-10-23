#ifndef MOONCPP_RETURNSTATEMENT_H
#define MOONCPP_RETURNSTATEMENT_H

#include "Statement.h"
#include "Expression.h"

class ReturnStatement : public Statement {
public:
    void setArgument(Expression *e);

    Expression *getArgument() { return _argument; }

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Expression *_argument = nullptr;
};


#endif //MOONCPP_RETURNSTATEMENT_H
