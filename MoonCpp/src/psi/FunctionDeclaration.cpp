#include "FunctionDeclaration.h"

void FunctionDeclaration::setId(Identifier *id) {
    _id = id; id->relate(this);
}

void FunctionDeclaration::setBody(BlockStatement *b) {
    _body = b; b->relate(this);
}
