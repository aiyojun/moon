#include "ForStatement.h"

void ForStatement::setInit(Expression *e) {
    _init = e; e->relate(this);
}

void ForStatement::setTest(Expression *e) {
    _test = e; e->relate(this);
}

void ForStatement::setUpdate(Expression *e) {
    _update = e; e->relate(this);
}

void ForStatement::setBody(BlockStatement *e) {
    _body = e; e->relate(this);
}
