#include "ArrayValue.h"

ArrayValue::ArrayValue() : ObjectValue() {}

IValue *ArrayValue::getItem(int i) { return _items[i]; }

void ArrayValue::setItem(int i, IValue *value) { _items[i] = value; }

void ArrayValue::addItem(IValue *value) { _items.emplace_back(value); }