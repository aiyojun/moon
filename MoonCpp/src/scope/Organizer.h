#ifndef MOONCPP_ORGANIZER_H
#define MOONCPP_ORGANIZER_H

#include "Scope.h"
#include "SymbolProvider.h"

class Organizer {
public:
    Organizer();

    ~Organizer();

    SymbolProvider *createFunctionScope();

    void scanClass(ClassDeclaration *decl);

    void scanFunction(FunctionDeclaration *decl);

    void scanVariable(VariableDeclaration *decl);

    void setGlobalSymbol(const std::string &name, IValue *value);

    void removeGlobalSymbol(const std::string &name);

    std::string toString();

    int getGlobalSymbolNumber();

private:
    Scope *_globalScope;
};


#endif //MOONCPP_ORGANIZER_H
