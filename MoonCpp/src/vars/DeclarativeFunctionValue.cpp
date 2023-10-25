#include "DeclarativeFunctionValue.h"

DeclarativeFunctionValue::DeclarativeFunctionValue(FunctionDeclaration *decl) : _decl(decl) {
    _isNull = false;
}

std::shared_ptr<IValue> DeclarativeFunctionValue::invoke(std::vector<std::shared_ptr<IValue>> args) {
    return _vm->invoke(_scope, _decl, args);
}
