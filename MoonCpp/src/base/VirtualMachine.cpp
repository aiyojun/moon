#include "VirtualMachine.h"
#include "BytecodeCompiler.h"
#include "Evaluation.h"

void VirtualMachine::compile(FunctionDeclaration *funcDecl) {
    if (_btc.find(funcDecl) != _btc.end()) return;
    auto compiler = new BytecodeCompiler();
    _btc[funcDecl] = compiler;
    _btc[funcDecl]->compile(funcDecl);
}

IValue *VirtualMachine::invoke(SymbolProvider *tbl, FunctionDeclaration *decl, std::vector<IValue *> args) {
    for (int i = 0; i < decl->getParams().size(); i++) {
        auto param = decl->getParams()[i];
        tbl->scan(Symbol::build(param->getName(), args[i]));
    }
    auto evaluator = new Evaluation(tbl, this);
    if (_btc.find(decl) == _btc.end())
        compile(decl);
    tbl->buildScope();
    auto _r = _btc[decl]->interpret(evaluator);
    tbl->popScope();
    return _r;
}

IValue *VirtualMachine::evaluate(SymbolProvider *scope, Expression *exp) {
    auto evaluator = new Evaluation(scope, this);
    return evaluator->evaluate(exp);
}
