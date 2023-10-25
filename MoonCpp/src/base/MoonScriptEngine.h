#ifndef MOONCPP_MOONSCRIPTENGINE_H
#define MOONCPP_MOONSCRIPTENGINE_H

#include <string>
#include "Program.h"
#include "Scope.h"
#include "SymbolProvider.h"
#include "VirtualMachine.h"
#include "PsiBuilder.h"
#include "Organizer.h"
#include "IValue.h"

class MoonScriptEngine {
public:
    MoonScriptEngine();

//    Program *program() { return _program; }

    void compile(const std::string &path);

    std::shared_ptr<IValue> run();

//    SymbolProvider *createFunctionScope() { return new SymbolProvider({_globalScope}); }

private:
//    Scope *_globalScope;
    Organizer *_org;

    VirtualMachine *_vm;

    PsiBuilder *_builder;

    Program *_program;
};

#endif //MOONCPP_MOONSCRIPTENGINE_H
