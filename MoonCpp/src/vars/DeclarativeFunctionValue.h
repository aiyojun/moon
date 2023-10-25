#ifndef MOONCPP_DECLARATIVEFUNCTIONVALUE_H
#define MOONCPP_DECLARATIVEFUNCTIONVALUE_H

#include "values.h"

class DeclarativeFunctionValue : public CallableValue {
public:
    explicit DeclarativeFunctionValue(FunctionDeclaration *decl);

    std::shared_ptr<IValue> invoke(std::vector<std::shared_ptr<IValue>> args) override;

    std::string toString() override { return "DeclarativeFunctionValue"; }

private:
    FunctionDeclaration *_decl;
};

#endif //MOONCPP_DECLARATIVEFUNCTIONVALUE_H
