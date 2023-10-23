#include "Scope.h"

Scope::Scope(std::string name) {
    _symbols.clear();
//    std::cout << "Scope create : " << name << "; size : " << std::to_string(_symbols.size()) << std::endl;
}

void Scope::add(Symbol *symbol) {
//    std::cout << "++ Scope add symbol " << (symbol ? symbol->toString() : "null") << std::endl;
    if (symbol) {
        _symbols[symbol->getName()] = symbol;
//        std::cout << "after add " << symbol->toString() << "\n--" << toString() << std::endl;
    }
}

void Scope::remove(const std::string &id) {
    _symbols.erase(id);
}

std::string Scope::toString() {
//    std::cout << "Scope symbol number : " << std::to_string(_symbols.size()) << std::endl;
    std::string stream;
    for (auto entry : _symbols) {
//        std::cout << "  scope::" << entry.first << "; " << entry.second->toString() << std::endl;
        stream.append("  ")
            .append(entry.first)
            .append(" : ")
            .append(entry.second->get()->toString())
            .append("\n");
    }
    return stream;
}

int Scope::getNumber() {
    return (int) _symbols.size();
}
