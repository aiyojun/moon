#ifndef MOONCPP_OBJECTVALUE_H
#define MOONCPP_OBJECTVALUE_H

#include <map>
#include <string>
#include "IValue.h"

class ObjectValue : public IValue {
public:
    ObjectValue();

    bool contains(const std::string &property);

    std::shared_ptr<IValue> getProperty(const std::string &name);

    void setProperty(const std::string &name, const std::shared_ptr<IValue> &value);

    bool isNull();

    std::string toString() override;

protected:
    bool _isNull = true;

private:
    std::map<std::string, std::shared_ptr<IValue>> _properties;
};

#endif //MOONCPP_OBJECTVALUE_H
