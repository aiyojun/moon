#ifndef MOONCPP_BUILTINPROVIDER_H
#define MOONCPP_BUILTINPROVIDER_H

#include "Literal.h"

class BuiltinProvider : public PsiElement {
public:
    virtual Literal *apply(const std::vector<Literal *> &args) = 0;

    std::string toString() override { return "BuiltinProvider"; }
};

#endif //MOONCPP_BUILTINPROVIDER_H
