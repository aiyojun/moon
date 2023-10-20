#ifndef MOONCPP_VALUESYSTEM_H
#define MOONCPP_VALUESYSTEM_H

#include <string>

class IValue;

class ObjectValue;

class NumberValue;

class BooleanValue;

class StringValue;

class DeclarativeFunctionValue;

class MethodValue;

class DeclarativeClassValue;

class DeclarativeObjectValue;

class FunctionDeclaration;

class ClassDeclaration;

class ValueSystem {
public:
    static ObjectValue *buildNull();

    static NumberValue *buildNumber(int value);

    static NumberValue *buildNumber(double value);

    static BooleanValue *buildBoolean(bool value);

    static StringValue *buildString(std::string value);

    static DeclarativeFunctionValue *buildDeclarativeFunction(FunctionDeclaration *decl);

    static MethodValue *buildMethod(ClassDeclaration *clazz, FunctionDeclaration *decl, ObjectValue *obj);

    static DeclarativeClassValue *buildDeclarativeClass(ClassDeclaration *decl);

    static DeclarativeObjectValue *buildDeclarativeObject(DeclarativeClassValue *clazz);

    static bool isTrue(IValue *value);
};

#endif //MOONCPP_VALUESYSTEM_H
