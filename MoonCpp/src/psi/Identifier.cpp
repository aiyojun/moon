#include "Identifier.h"

Identifier *Identifier::build(const std::string &name) {
    auto identifier = new Identifier;
    identifier->setName(name);
    return identifier;
}
