#include "ObjectValue.h"
#include "BaseValue.h"

ObjectValue::ObjectValue() : IValue() {}

bool ObjectValue::contains(const std::string &property) { return _properties.find(property) != _properties.end(); }

std::shared_ptr<IValue> ObjectValue::getProperty(const std::string &name) { return _properties[name]; }

void ObjectValue::setProperty(const std::string &name,const std::shared_ptr<IValue> &value) { _properties[name] = value; }

bool ObjectValue::isNull() { return _isNull; }

std::string ObjectValue::toString() {
    if (isNull()) return "null";
    std::string ss("{ ");
    for (auto pair: _properties) {
        ss.append(pair.first)
            .append(" : ")
            .append(pair.second->toString())
            .append("; ");
    }
    ss.append("}");
    return ss;
}
