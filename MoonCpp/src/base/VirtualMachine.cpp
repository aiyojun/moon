#include "VirtualMachine.h"
#include "MoonScriptEngine.h"

void VirtualMachine::compile(FunctionDeclaration *funcDecl) {
    if (_btc.find(funcDecl) != _btc.end()) return;
    auto compiler = new BytecodeCompiler(_engine->evaluator());
    _btc[funcDecl] = compiler;
    _btc[funcDecl]->compile(funcDecl);
}

Literal *VirtualMachine::invoke(FunctionDeclaration *funcDecl) {
    return _btc[funcDecl]->interpret();
}
