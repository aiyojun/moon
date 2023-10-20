#include "MethodValue.h"

MethodValue::MethodValue(ClassDeclaration *clazz, FunctionDeclaration *decl, ObjectValue *obj)
    : _clazz(clazz), _decl(decl), _obj(obj) {

}

IValue *MethodValue::invoke(std::vector<IValue *> args) {
    _scope->buildScope();
    auto _s = new Scope;
    _s->add(Symbol::build("self", _obj));
    auto _r = _vm->invoke(_scope->derive(_s), _decl, args);
    _scope->popScope();
    return nullptr;
}
