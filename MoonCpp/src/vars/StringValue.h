#ifndef MOONCPP_STRINGVALUE_H
#define MOONCPP_STRINGVALUE_H

#include "ObjectValue.h"
#include <string>

class StringValue : public ObjectValue {
public:
    explicit StringValue(std::string value);

    const std::string &getValue();

    void setValue(const std::string &value);

    std::string toString() override;

private:
    std::string _value;
};


#endif //MOONCPP_STRINGVALUE_H
