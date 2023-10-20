#ifndef MOONCPP_REF_H
#define MOONCPP_REF_H

#include <string>

class IValue;

class ObjectValue;

class ArrayValue;

namespace jlib {

    class Ref {
    public:
        Ref() = default;

        void setValue(IValue *v);

        static Ref *refObject(ObjectValue *obj, const std::string &key);

        static Ref *refArray(ArrayValue *obj, int index);

    private:
        ObjectValue *_ptr = nullptr;

        std::string _key;

        int _idx = -1;
    };

}
#endif //MOONCPP_REF_H
