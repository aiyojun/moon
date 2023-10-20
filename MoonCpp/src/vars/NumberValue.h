#ifndef MOONCPP_NUMBERVALUE_H
#define MOONCPP_NUMBERVALUE_H

#include "BaseValue.h"

class NumberValue : public BaseValue {
public:
    enum NumberValueType { INT, FLOAT };

    union Storage { int _iv; double _fv; };

    explicit NumberValue(int value);

    explicit NumberValue(double value);

    std::string toString() override;

    int getAsInteger();

    double getAsDouble();

    bool isTrue();

    bool isInteger();

    int getInteger();

    double getFloat();

private:

    Storage _value;

    NumberValueType _type;
};

#endif //MOONCPP_NUMBERVALUE_H
