#ifndef MOONCPP_MOONSCRIPTENGINE_H
#define MOONCPP_MOONSCRIPTENGINE_H

#include <string>
#include "Literal.h"
#include "Program.h"
#include "Scope.h"
#include "SymbolProvider.h"
#include "VirtualMachine.h"
#include "PsiBuilder.h"

class MoonScriptEngine {
public:
    MoonScriptEngine();

    Program *program() { return _program; }

    void compile(const std::string &path);

    Literal *run();

    SymbolProvider *createFunctionScope() { return new SymbolProvider({_globalScope}); }

private:
    Scope *_globalScope;

    VirtualMachine *_vm;

    PsiBuilder *_builder;

    Program *_program;
};

#endif //MOONCPP_MOONSCRIPTENGINE_H
