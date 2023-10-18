#include "Scope.h"

Scope::Scope(std::string name) {

}

void Scope::add(Symbol *symbol) {
    if (symbol)
        _symbols[symbol->getName()] = symbol;
}


