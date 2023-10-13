#include "ClassDeclaration.h"

void ClassDeclaration::setId(Identifier *id) {
    _id = id; _id->relate(this);
}
