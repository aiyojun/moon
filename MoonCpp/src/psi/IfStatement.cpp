#include "IfStatement.h"

void IfStatement::setTest(Expression *e) {
    _test = e; e->relate(this);
}

void IfStatement::setConsequent(BlockStatement *s) {
    _consequent = s; s->relate(this);
}

void IfStatement::setAlternate(Statement *s) {
    _alternate = s; s->relate(this);
}
