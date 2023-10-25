#ifndef MOONCPP_CALLABLEVALUE_H
#define MOONCPP_CALLABLEVALUE_H

#include "ObjectValue.h"
#include "SymbolProvider.h"
#include "VirtualMachine.h"
#include <vector>

class CallableValue : public ObjectValue {
public:
    virtual std::shared_ptr<IValue> invoke(std::vector<std::shared_ptr<IValue> > args) = 0;

    void setScope(SymbolProvider *scope) { _scope = scope; }

    void setVM(VirtualMachine *vm) { _vm = vm; }

protected:
    SymbolProvider *_scope = nullptr;

    VirtualMachine *_vm = nullptr;
};

#endif //MOONCPP_CALLABLEVALUE_H
