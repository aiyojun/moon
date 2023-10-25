#ifndef MOONCPP_METHODVALUE_H
#define MOONCPP_METHODVALUE_H

#include "CallableValue.h"

class ClassDeclaration;

class FunctionDeclaration;

class MethodValue : public CallableValue {
public:
    MethodValue(ClassDeclaration *clazz, FunctionDeclaration *decl, const std::shared_ptr<ObjectValue> &obj);

    std::shared_ptr<IValue> invoke(std::vector<std::shared_ptr<IValue>> args) override;

private:
    ClassDeclaration *_clazz;

    FunctionDeclaration *_decl;

    std::shared_ptr<ObjectValue> _obj;
};


#endif //MOONCPP_METHODVALUE_H
