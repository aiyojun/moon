#ifndef MOONCPP_VIRTUALMACHINE_H
#define MOONCPP_VIRTUALMACHINE_H

#include "FunctionDeclaration.h"
#include "Literal.h"
#include "BytecodeCompiler.h"
#include "SymbolProvider.h"

class MoonScriptEngine;

class VirtualMachine {
public:
    explicit VirtualMachine(MoonScriptEngine* engine): _engine(engine) {}

    void compile(FunctionDeclaration *funcDecl);

    Literal *invoke(SymbolProvider *tbl, FunctionDeclaration *fnt, std::vector<Literal *> args);

    Literal *evaluate(SymbolProvider *tbl, Expression *exp);

private:
    MoonScriptEngine* _engine;

    std::map<FunctionDeclaration *, BytecodeCompiler *> _btc;
};

#endif //MOONCPP_VIRTUALMACHINE_H
