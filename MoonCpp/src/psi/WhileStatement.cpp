#include "WhileStatement.h"

void WhileStatement::setTest(Expression *e) {
    _test = e; e->relate(this);
}

void WhileStatement::setBody(BlockStatement *s) {
    _body = s; s->relate(this);
}


