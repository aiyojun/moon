#include "BooleanValue.h"

BooleanValue::BooleanValue(bool value) : BaseValue(), _value(value) {}

bool BooleanValue::getValue() { return _value; }

void BooleanValue::setValue(bool value) { _value = value; }

std::string BooleanValue::toString() { return _value ? "true" : "false"; }