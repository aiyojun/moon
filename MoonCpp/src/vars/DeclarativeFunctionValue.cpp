#include "DeclarativeFunctionValue.h"

DeclarativeFunctionValue::DeclarativeFunctionValue(FunctionDeclaration *decl) : _decl(decl) {
    _isNull = false;
}

IValue *DeclarativeFunctionValue::invoke(std::vector<IValue *> args) {
    return _vm->invoke(_scope, _decl, args);
}
