#include "ThrowStatement.h"

void ThrowStatement::setArgument(Expression *e) {
    _argument = e; e->relate(this);
}
