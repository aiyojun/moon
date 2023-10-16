#ifndef MOONCPP_VIRTUALMACHINE_H
#define MOONCPP_VIRTUALMACHINE_H

#include "FunctionDeclaration.h"
#include "Literal.h"
#include "BytecodeCompiler.h"

class MoonScriptEngine;

class VirtualMachine {
public:
    explicit VirtualMachine(MoonScriptEngine* engine): _engine(engine) {}

    void compile(FunctionDeclaration *funcDecl);

    Literal *invoke(FunctionDeclaration* funcDecl);

private:
    MoonScriptEngine* _engine;

    std::map<FunctionDeclaration *, BytecodeCompiler *> _btc;
};


#endif //MOONCPP_VIRTUALMACHINE_H
