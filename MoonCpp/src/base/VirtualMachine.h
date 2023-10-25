#ifndef MOONCPP_VIRTUALMACHINE_H
#define MOONCPP_VIRTUALMACHINE_H

#include <map>
#include <vector>
#include "types.h"

class FunctionDeclaration;

class BytecodeCompiler;

class SymbolProvider;

class Expression;

class IValue;

class VirtualMachine {
public:
    VirtualMachine() = default;

    void compile(FunctionDeclaration *funcDecl);

    std::shared_ptr<IValue> invoke(SymbolProvider *tbl, FunctionDeclaration *fnt, std::vector<std::shared_ptr<IValue> > args);

    std::shared_ptr<IValue> evaluate(SymbolProvider *tbl, Expression *exp);

private:

    std::map<FunctionDeclaration *, BytecodeCompiler *> _btc;
};

#endif //MOONCPP_VIRTUALMACHINE_H
