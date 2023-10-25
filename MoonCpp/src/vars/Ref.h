#ifndef MOONCPP_REF_H
#define MOONCPP_REF_H

#include <string>
#include "types.h"

class IValue;

class ObjectValue;

class ArrayValue;

namespace jlib {

    class Ref {
    public:
        Ref() = default;

        void setValue(std::shared_ptr<IValue> v);

        static std::shared_ptr<Ref> refObject(const std::shared_ptr<ObjectValue> &obj, const std::string &key);

        static std::shared_ptr<Ref> refArray(const std::shared_ptr<ArrayValue> &obj, int index);

    private:
        std::shared_ptr<ObjectValue> _ptr;

        std::string _key;

        int _idx = -1;
    };

}
#endif //MOONCPP_REF_H
