#ifndef MOONCPP_IVALUE_H
#define MOONCPP_IVALUE_H

#include <string>
#include <memory>

namespace jlib { class Ref; }

class IValue {
public:
    IValue() : _ref(nullptr) {}

    bool hasRef();

    std::shared_ptr<jlib::Ref> getRef();

    void setRef(const std::shared_ptr<jlib::Ref> &ref);

    void clearRef();

    virtual std::string toString();

private:
    std::shared_ptr<jlib::Ref> _ref;
};


#endif //MOONCPP_IVALUE_H
