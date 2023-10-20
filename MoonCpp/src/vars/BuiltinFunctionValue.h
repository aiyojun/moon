#ifndef MOONCPP_BUILTINFUNCTIONVALUE_H
#define MOONCPP_BUILTINFUNCTIONVALUE_H

#include "CallableValue.h"

class BuiltinFunctionValue : public CallableValue {
public:
    std::string toString() override { return "BuiltinFunctionValue"; }
};

#endif //MOONCPP_BUILTINFUNCTIONVALUE_H
