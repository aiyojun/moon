#include "TryStatement.h"

void TryStatement::setBlock(BlockStatement *s) {
    _block = s; s->relate(this);
}

void TryStatement::setHandler(CatchStatement *s) {
    _handler = s; s->relate(this);
}

void TryStatement::setFinalizer(BlockStatement *s) {
    _finalizer = s; s->relate(this);
}
