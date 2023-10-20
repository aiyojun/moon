#include "StringValue.h"

StringValue::StringValue(std::string value) : _value(std::move(value)) {}

const std::string &StringValue::getValue() { return _value; }

void StringValue::setValue(const std::string &value) { _value = value; }

std::string StringValue::toString() { return _value; }