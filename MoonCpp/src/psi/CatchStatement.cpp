#include "CatchStatement.h"

void CatchStatement::setParam(Identifier *id) {
    _param = id; id->relate(this);
}

void CatchStatement::setBody(BlockStatement *b) {
    _body = b; b->relate(this);
}
