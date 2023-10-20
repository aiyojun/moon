#ifndef MOONCPP_IVALUE_H
#define MOONCPP_IVALUE_H

#include <string>

namespace jlib {
    class Ref;
}

class IValue {
public:
    IValue() : _ref(nullptr) {}

    bool hasRef();

    jlib::Ref *getRef();

    void setRef(jlib::Ref *ref);

    void clearRef();

    virtual std::string toString();

private:
    jlib::Ref *_ref = nullptr;
};


#endif //MOONCPP_IVALUE_H
