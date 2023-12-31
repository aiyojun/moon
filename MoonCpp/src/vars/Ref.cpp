#include "Ref.h"

#include "types.h"
#include "values.h"
#include "SyntaxError.h"

void jlib::Ref::setValue(std::shared_ptr<IValue> v) {
    if (!_ptr)
        throw SyntaxError("error: set null ref");
    if (instanceof<ArrayValue *>(_ptr)) {
//        as<ArrayValue *>(_ptr)->setItem(_idx, v);
        downcast<ArrayValue>(_ptr)->setItem(_idx, v);
    } else if (instanceof<ObjectValue *>(_ptr)) {
        _ptr->setProperty(_key, v);
    }
}

std::shared_ptr<jlib::Ref> jlib::Ref::refObject(const std::shared_ptr<ObjectValue> &obj, const std::string &key) {
    auto _r = std::shared_ptr<Ref>(new Ref());
    _r->_ptr = obj;
    _r->_key = key;
    return _r;
}

std::shared_ptr<jlib::Ref> jlib::Ref::refArray(const std::shared_ptr<ArrayValue> &obj, int index) {
    auto _r = std::shared_ptr<Ref>(new Ref());
//    _r->_ptr = static_cast<ObjectValue *>(obj);
    _r->_ptr = obj;
    _r->_idx = index;
    return _r;
}
