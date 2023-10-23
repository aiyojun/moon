#ifndef MOONCPP_THROWSTATEMENT_H
#define MOONCPP_THROWSTATEMENT_H

#include "Statement.h"
#include "Expression.h"

class ThrowStatement : public Statement {
public:
    void setArgument(Expression *e);

    Expression *getArgument() { return _argument; }

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Expression *_argument = nullptr;
};


#endif //MOONCPP_THROWSTATEMENT_H
