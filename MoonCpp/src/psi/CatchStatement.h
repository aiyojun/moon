#ifndef MOONCPP_CATCHSTATEMENT_H
#define MOONCPP_CATCHSTATEMENT_H

#include "Statement.h"
#include "Identifier.h"
#include "BlockStatement.h"

class CatchStatement : public Statement {
public:
    void setParam(Identifier* id);

    Identifier* getParam() {return _param;}

    void setBody(BlockStatement* b);

    BlockStatement* getBody() {return _body;}
private:
    Identifier* _param;

    BlockStatement* _body;
};


#endif //MOONCPP_CATCHSTATEMENT_H