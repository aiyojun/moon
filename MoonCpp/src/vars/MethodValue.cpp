#include "MethodValue.h"

MethodValue::MethodValue(ClassDeclaration *clazz, FunctionDeclaration *decl, const std::shared_ptr<ObjectValue> &obj)
    : _clazz(clazz), _decl(decl), _obj(obj) {

}

std::shared_ptr<IValue> MethodValue::invoke(std::vector<std::shared_ptr<IValue> > args) {
    auto _s = new Scope;
    _s->add(Symbol::build("self", _obj));
    _scope->buildScope();
    auto _r = _vm->invoke(_scope->derive(_s), _decl, args);
    _scope->popScope();
    return _r;
}
