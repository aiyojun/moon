#ifndef MOONCPP_TRYSTATEMENT_H
#define MOONCPP_TRYSTATEMENT_H

#include "Statement.h"
#include "BlockStatement.h"
#include "CatchStatement.h"

class TryStatement : public Statement {
public:
    void setBlock(BlockStatement* s);

    void setHandler(CatchStatement* s);

    void setFinalizer(BlockStatement* s);

    BlockStatement* getBlock() {return _block;}

    CatchStatement* getHandler() {return _handler;}

    BlockStatement* getFinalizer() {return _finalizer;}

private:
    BlockStatement* _block = nullptr;

    CatchStatement* _handler = nullptr;

    BlockStatement* _finalizer = nullptr;
};


#endif //MOONCPP_TRYSTATEMENT_H
