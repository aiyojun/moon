#ifndef MOONCPP_DECLARATIVEOBJECTVALUE_H
#define MOONCPP_DECLARATIVEOBJECTVALUE_H

#include "ObjectValue.h"

class DeclarativeClassValue;

class DeclarativeObjectValue : public ObjectValue {
public:
    explicit DeclarativeObjectValue(DeclarativeClassValue *clazz);

    std::string toString() override;

    DeclarativeClassValue *getClazz() { return _clazz; }

private:
    DeclarativeClassValue *_clazz;
};

#endif //MOONCPP_DECLARATIVEOBJECTVALUE_H
