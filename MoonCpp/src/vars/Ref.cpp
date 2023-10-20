#include "Ref.h"
#include "types.h"
#include "values.h"
#include "SyntaxError.h"

void jlib::Ref::setValue(IValue *v) {
    if (!_ptr)
        throw SyntaxError("error: set null ref");
    if (instanceof<ArrayValue *>(_ptr)) {
        as<ArrayValue *>(_ptr)->setItem(_idx, v);
    } else if (instanceof<ObjectValue *>(_ptr)) {
        _ptr->setProperty(_key, v);
    }
}

jlib::Ref *jlib::Ref::refObject(ObjectValue *obj, const std::string &key) {
    auto _r = new Ref();
    _r->_ptr = obj;
    _r->_key = key;
    return _r;
}

jlib::Ref *jlib::Ref::refArray(ArrayValue *obj, int index) {
    auto _r = new Ref();
    _r->_ptr = static_cast<ObjectValue *>(obj);
    _r->_idx = index;
    return _r;
}
