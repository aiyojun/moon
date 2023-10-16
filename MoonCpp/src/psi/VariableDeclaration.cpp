#include "VariableDeclaration.h"

void VariableDeclaration::setId(Identifier *id) {
    _id = id; id->relate(this);
}

void VariableDeclaration::setInit(Expression *e) {
    _init = e; e->relate(this);
}
