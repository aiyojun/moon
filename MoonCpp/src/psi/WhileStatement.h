#ifndef MOONCPP_WHILESTATEMENT_H
#define MOONCPP_WHILESTATEMENT_H

#include "Statement.h"
#include "Expression.h"
#include "BlockStatement.h"

class WhileStatement : public Statement {
public:
    void setTest(Expression *e);

    void setBody(BlockStatement *s);

    Expression *getTest() { return _test; }

    BlockStatement *getBody() { return _body; }

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Expression *_test = nullptr;

    BlockStatement *_body = nullptr;
};


#endif //MOONCPP_WHILESTATEMENT_H
