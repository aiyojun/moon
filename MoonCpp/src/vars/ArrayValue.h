#ifndef MOONCPP_ARRAYVALUE_H
#define MOONCPP_ARRAYVALUE_H

#include <vector>
#include "ObjectValue.h"

class ArrayValue : public ObjectValue {
public:
    ArrayValue();

    IValue *getItem(int i);

    void setItem(int i, IValue *value);

    void addItem(IValue *value);

private:
    std::vector<IValue *> _items;
};

#endif //MOONCPP_ARRAYVALUE_H
