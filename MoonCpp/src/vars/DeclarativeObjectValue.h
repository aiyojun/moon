#ifndef MOONCPP_DECLARATIVEOBJECTVALUE_H
#define MOONCPP_DECLARATIVEOBJECTVALUE_H

#include "ObjectValue.h"

class DeclarativeClassValue;

class DeclarativeObjectValue : public ObjectValue {
public:
    explicit DeclarativeObjectValue(const std::shared_ptr<DeclarativeClassValue> &clazz);

    std::string toString() override;

    std::shared_ptr<DeclarativeClassValue> getClazz() { return _clazz; }

private:
    std::shared_ptr<DeclarativeClassValue> _clazz;
};

#endif //MOONCPP_DECLARATIVEOBJECTVALUE_H
