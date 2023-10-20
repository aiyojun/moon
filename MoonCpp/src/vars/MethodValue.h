#ifndef MOONCPP_METHODVALUE_H
#define MOONCPP_METHODVALUE_H

#include "CallableValue.h"

class ClassDeclaration;

class FunctionDeclaration;

class MethodValue : public CallableValue {
public:
    MethodValue(ClassDeclaration *clazz, FunctionDeclaration *decl, ObjectValue *obj);

    IValue * invoke(std::vector<IValue *> args) override;

private:
    ClassDeclaration *_clazz;

    FunctionDeclaration *_decl;

    ObjectValue *_obj;
};


#endif //MOONCPP_METHODVALUE_H
