#include "ArrayValue.h"

ArrayValue::ArrayValue() : ObjectValue() {}

std::shared_ptr<IValue> ArrayValue::getItem(int i) { return _items[i]; }

void ArrayValue::setItem(int i, const std::shared_ptr<IValue> &value) { _items[i] = value; }

void ArrayValue::addItem(const std::shared_ptr<IValue> &value) { _items.emplace_back(value); }