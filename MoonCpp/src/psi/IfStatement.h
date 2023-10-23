#ifndef MOONCPP_IFSTATEMENT_H
#define MOONCPP_IFSTATEMENT_H

#include "Statement.h"
#include "Expression.h"
#include "BlockStatement.h"

class IfStatement : public Statement {
public:
    void setTest(Expression *e);

    void setConsequent(BlockStatement *s);

    void setAlternate(Statement *s);

    Expression *getTest() { return _test; }

    BlockStatement *getConsequent() { return _consequent; }

    Statement *getAlternate() { return _alternate; }

    PsiElement * mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Expression *_test = nullptr;

    BlockStatement *_consequent = nullptr;

    Statement *_alternate = nullptr;
};


#endif //MOONCPP_IFSTATEMENT_H
