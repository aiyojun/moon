#include "ValueSystem.h"
#include "values.h"

Wrapper(ObjectValue) ValueSystem::buildNull() {return Wrap(ObjectValue, new ObjectValue);}

Wrapper(NumberValue) ValueSystem::buildNumber(int value) { return Wrap(NumberValue, new NumberValue(value)); }

Wrapper(NumberValue) ValueSystem::buildNumber(double value) { return Wrap(NumberValue, new NumberValue(value)); }

Wrapper(BooleanValue) ValueSystem::buildBoolean(bool value) { return Wrap(BooleanValue, new BooleanValue(value)); }

Wrapper(StringValue) ValueSystem::buildString(std::string value) { return Wrap(StringValue, new StringValue(std::move(value))); }

Wrapper(DeclarativeFunctionValue) ValueSystem::buildDeclarativeFunction(FunctionDeclaration *decl) { return Wrap(DeclarativeFunctionValue, new DeclarativeFunctionValue(decl)); }

Wrapper(MethodValue) ValueSystem::buildMethod(ClassDeclaration *clazz, FunctionDeclaration *decl, const Wrapper(ObjectValue) &obj) { return Wrap(MethodValue, Wrap(MethodValue, new MethodValue(clazz, decl, obj))); }

Wrapper(DeclarativeClassValue) ValueSystem::buildDeclarativeClass(ClassDeclaration *decl) { return Wrap(DeclarativeClassValue, new DeclarativeClassValue(decl)); }

Wrapper(DeclarativeObjectValue) ValueSystem::buildDeclarativeObject(Wrapper(DeclarativeClassValue) clazz) { return Wrap(DeclarativeObjectValue, new DeclarativeObjectValue(clazz)); }

bool ValueSystem::isTrue(const Wrapper(IValue) &value) {
    if (instanceof<ObjectValue *>(value)) return !downcast<ObjectValue>(value)->isNull();
    if (instanceof<NumberValue *>(value)) return downcast<NumberValue>(value)->isTrue();
    if (instanceof<BooleanValue *>(value)) return downcast<BooleanValue>(value)->getValue();
    return false;
}
