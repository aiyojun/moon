#include "DeclarativeObjectValue.h"

#include <utility>
#include "DeclarativeClassValue.h"
#include "FunctionDeclaration.h"
#include "ValueSystem.h"
#include "VariableDeclaration.h"
#include "MethodValue.h"

DeclarativeObjectValue::DeclarativeObjectValue(const std::shared_ptr<DeclarativeClassValue> &clazz)
    : _clazz(std::move(clazz)) {
    _isNull = false;
    for (auto variable : _clazz->getClazz()->getVariables()) {
        setProperty(variable->getId()->getName(), ValueSystem::buildNull());
    }
    for (auto method : _clazz->getClazz()->getMethods()) {
        setProperty(method->getId()->getName(), ValueSystem::buildMethod(_clazz->getClazz(), method, Wrap(DeclarativeObjectValue, this)));
    }
}

std::string DeclarativeObjectValue::toString()
{ return _clazz->getClazz()->getId()->getName() + " " + ObjectValue::toString(); }
