#include "ReturnStatement.h"

void ReturnStatement::setArgument(Expression *e) {
    _argument = e; e->relate(this);
}
