#ifndef MOONCPP_CATCHSTATEMENT_H
#define MOONCPP_CATCHSTATEMENT_H

#include "Statement.h"
#include "Identifier.h"
#include "BlockStatement.h"

class CatchStatement : public Statement {
public:
    void setParam(Identifier *id);

    Identifier *getParam() { return _param; }

    void setBody(BlockStatement *b);

    BlockStatement *getBody() { return _body; }

    PsiElement *mount() override;

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    Identifier *_param = nullptr;

    BlockStatement *_body = nullptr;
};


#endif //MOONCPP_CATCHSTATEMENT_H
