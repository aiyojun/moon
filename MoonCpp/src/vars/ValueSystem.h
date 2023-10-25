#ifndef MOONCPP_VALUESYSTEM_H
#define MOONCPP_VALUESYSTEM_H

#include <string>
#include <memory>

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
    static std::shared_ptr<ObjectValue> buildNull();

    static std::shared_ptr<NumberValue> buildNumber(int value);

    static std::shared_ptr<NumberValue> buildNumber(double value);

    static std::shared_ptr<BooleanValue> buildBoolean(bool value);

    static std::shared_ptr<StringValue> buildString(std::string value);

    static std::shared_ptr<DeclarativeFunctionValue> buildDeclarativeFunction(FunctionDeclaration *decl);

    static std::shared_ptr<MethodValue> buildMethod(ClassDeclaration *clazz, FunctionDeclaration *decl, const std::shared_ptr<ObjectValue> &obj);

    static std::shared_ptr<DeclarativeClassValue> buildDeclarativeClass(ClassDeclaration *decl);

    static std::shared_ptr<DeclarativeObjectValue> buildDeclarativeObject(std::shared_ptr<DeclarativeClassValue> clazz);

    static bool isTrue(const std::shared_ptr<IValue> &value);
};

#endif //MOONCPP_VALUESYSTEM_H
