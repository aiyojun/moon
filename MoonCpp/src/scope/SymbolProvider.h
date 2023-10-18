#ifndef MOONCPP_SYMBOLPROVIDER_H
#define MOONCPP_SYMBOLPROVIDER_H

#include "Scope.h"

class SymbolProvider {
public:
    explicit SymbolProvider(std::vector<Scope *> scopes) : _nestedScopes(std::move(scopes)) {}

    bool contains(const std::string& id);

    Symbol *get(const std::string& id);

    void add(Symbol *symbol);

    void buildScope();

    void popScope();

    void scan(Symbol *symbol);

private:
    std::vector<Scope *> _nestedScopes;
};


#endif //MOONCPP_SYMBOLPROVIDER_H
