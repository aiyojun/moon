#ifndef MOONCPP_VIRTUALMACHINE_H
#define MOONCPP_VIRTUALMACHINE_H

#include <map>
#include <vector>

class FunctionDeclaration;

class BytecodeCompiler;

class SymbolProvider;

class Expression;

class IValue;

class VirtualMachine {
public:
    VirtualMachine() = default;

    void compile(FunctionDeclaration *funcDecl);

    IValue *invoke(SymbolProvider *tbl, FunctionDeclaration *fnt, std::vector<IValue *> args);

    IValue *evaluate(SymbolProvider *tbl, Expression *exp);

private:

    std::map<FunctionDeclaration *, BytecodeCompiler *> _btc;
};

#endif //MOONCPP_VIRTUALMACHINE_H
