#include "VirtualMachine.h"
#include "MoonScriptEngine.h"
#include "BytecodeCompiler.h"
#include "Evaluator.h"

void VirtualMachine::compile(FunctionDeclaration *funcDecl) {
    if (_btc.find(funcDecl) != _btc.end()) return;
    auto compiler = new BytecodeCompiler();
    _btc[funcDecl] = compiler;
    _btc[funcDecl]->compile(funcDecl);
}

Literal *VirtualMachine::invoke(SymbolProvider *tbl, FunctionDeclaration *decl, std::vector<Literal *> args) {
    tbl->buildScope();
    for (int i = 0; i < decl->getParams().size(); i++) {
        auto param = decl->getParams()[i];
        tbl->scan(Symbol::build(param, args[i]));
    }
    auto evaluator = new Evaluator(_engine, this, tbl);
    auto _r = _btc[decl]->interpret(evaluator);
    tbl->popScope();
    return _r;
}

Literal *VirtualMachine::evaluate(SymbolProvider *tbl, Expression *exp) {
    auto evaluator = new Evaluator(_engine, this, tbl);
    return evaluator->evaluate(exp);
}
