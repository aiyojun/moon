#ifndef MOONCPP_BOOLEANVALUE_H
#define MOONCPP_BOOLEANVALUE_H

#include "BaseValue.h"

class BooleanValue : public BaseValue {
public:
    explicit BooleanValue(bool value);

    bool getValue();

    void setValue(bool value);

    std::string toString() override;

private:
    bool _value;
};


#endif //MOONCPP_BOOLEANVALUE_H
