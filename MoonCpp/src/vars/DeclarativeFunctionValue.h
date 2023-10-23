#ifndef MOONCPP_DECLARATIVEFUNCTIONVALUE_H
#define MOONCPP_DECLARATIVEFUNCTIONVALUE_H

#include "values.h"

class DeclarativeFunctionValue : public CallableValue {
public:
    explicit DeclarativeFunctionValue(FunctionDeclaration *decl);

    IValue * invoke(std::vector<IValue *> args) override;

    std::string toString() override { return "DeclarativeFunctionValue"; }

private:
    FunctionDeclaration *_decl;
};

#endif //MOONCPP_DECLARATIVEFUNCTIONVALUE_H
