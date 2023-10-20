#include "ObjectValue.h"

ObjectValue::ObjectValue() : IValue() {}

bool ObjectValue::contains(const std::string &property) { return _properties.find(property) != _properties.end(); }

IValue *ObjectValue::getProperty(const std::string &name) { return _properties[name]; }

void ObjectValue::setProperty(const std::string &name, IValue *value) { _properties[name] = value; }

bool ObjectValue::isNull() { return _isNull; }

std::string ObjectValue::toString() {
    return IValue::toString();
}
