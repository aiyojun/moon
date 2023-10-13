#include "MemberExpression.h"

void MemberExpression::setObject(Expression *e) {
    _object = e; _object->relate(this);
}

void MemberExpression::setProperty(Expression *e) {
    _property = e; _property->relate(this);
}
