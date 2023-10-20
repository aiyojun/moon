#include "Scope.h"

Scope::Scope(std::string name) {
    std::cout << "Scope create : " << name << std::endl;
}

void Scope::add(Symbol *symbol) {
    std::cout << "Scope add symbol " << (symbol ? symbol->toString() : "null") << std::endl;
    if (symbol) {
        _symbols[symbol->getName()] = symbol;
        std::cout << "after add " << symbol->toString() << "\n--" << toString() << std::endl;
    }
}

void Scope::remove(const std::string &id) {
    _symbols.erase(id);
}


std::string Scope::toString() {
    std::string stream;
    for (auto entry : _symbols) {
        stream.append("  ")
            .append(entry.first)
            .append(" : ")
            .append(entry.second->get()->toString());
    }
    return stream;
}

int Scope::getNumber() {
    return _symbols.size();
}
