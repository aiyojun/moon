#ifndef MOONCPP_ARRAYVALUE_H
#define MOONCPP_ARRAYVALUE_H

#include <vector>
#include <memory>
#include "ObjectValue.h"

class ArrayValue : public ObjectValue {
public:
    ArrayValue();

    std::shared_ptr<IValue> getItem(int i);

    void setItem(int i, const std::shared_ptr<IValue> &value);

    void addItem(const std::shared_ptr<IValue> &value);

private:
    std::vector<std::shared_ptr<IValue> > _items;
};

#endif //MOONCPP_ARRAYVALUE_H
