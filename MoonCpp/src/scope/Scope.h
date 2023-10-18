#ifndef MOONCPP_SCOPE_H
#define MOONCPP_SCOPE_H

#include <map>
#include <string>
#include "Symbol.h"

class Scope {
public:
    explicit Scope(std::string name = "");

    bool contains(const std::string &id) { return _symbols.find(id) == _symbols.end(); }

    Symbol *get(const std::string &id) { return _symbols[id]; }

    void add(Symbol *symbol);

private:
    std::string _name;

    std::map<std::string, Symbol *> _symbols;
};


#endif //MOONCPP_SCOPE_H
