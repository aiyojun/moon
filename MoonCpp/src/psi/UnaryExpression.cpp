#include "UnaryExpression.h"

std::string UnaryExpression::toString() {
    std::string s;
    if (_prefix)
        s.append(_operator).append(" ");
    s.append(_argument->toString());
    if (!_prefix)
        s.append(_operator).append(" ");
    return s;
}

void UnaryExpression::setArgument(Expression *e) {
    _argument = e; if (e) e->relate(this);
}
