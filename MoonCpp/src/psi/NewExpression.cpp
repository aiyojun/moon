#include "NewExpression.h"

void NewExpression::setCallee(Identifier *callee) {
    _callee = callee; _callee->relate(this);
}
