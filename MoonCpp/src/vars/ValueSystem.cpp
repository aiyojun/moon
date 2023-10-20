#include "ValueSystem.h"
#include "types.h"
#include "values.h"

ObjectValue *ValueSystem::buildNull() { return new ObjectValue; }

NumberValue *ValueSystem::buildNumber(int value) { return new NumberValue(value); }

NumberValue *ValueSystem::buildNumber(double value) { return new NumberValue(value); }

BooleanValue *ValueSystem::buildBoolean(bool value) { return new BooleanValue(value); }

StringValue *ValueSystem::buildString(std::string value) { return new StringValue(std::move(value)); }

DeclarativeFunctionValue *ValueSystem::buildDeclarativeFunction(FunctionDeclaration *decl) { return new DeclarativeFunctionValue(decl); }

MethodValue *ValueSystem::buildMethod(ClassDeclaration *clazz, FunctionDeclaration *decl, ObjectValue *obj) { return new MethodValue(clazz, decl, obj); }

DeclarativeClassValue *ValueSystem::buildDeclarativeClass(ClassDeclaration *decl) { return new DeclarativeClassValue(decl); }

DeclarativeObjectValue *ValueSystem::buildDeclarativeObject(DeclarativeClassValue *clazz) { return new DeclarativeObjectValue(clazz); }

bool ValueSystem::isTrue(IValue *value) {
    if (instanceof<ObjectValue *>(value)) return !as<ObjectValue *>(value)->isNull();
    if (instanceof<NumberValue *>(value)) return as<NumberValue *>(value)->isTrue();
    if (instanceof<BooleanValue *>(value)) return as<BooleanValue *>(value)->getValue();
    return false;
}
