#ifndef MOONCPP_FORSTATEMENT_H
#define MOONCPP_FORSTATEMENT_H

#include "LoopStatement.h"
#include "BlockStatement.h"
#include "Expression.h"

class ForStatement : public LoopStatement {
public:
    void setInit(Expression *);

    void setTest(Expression *);

    void setUpdate(Expression *);

    void setBody(BlockStatement *);

    Expression *getInit() { return _init; }

    Expression *getTest() { return _test; }

    Expression *getUpdate() { return _update; }

    BlockStatement *getBody() { return _body; }

private:
    Expression *_init = nullptr;

    Expression *_test = nullptr;

    Expression *_update = nullptr;

    BlockStatement *_body = nullptr;
};


#endif //MOONCPP_FORSTATEMENT_H
