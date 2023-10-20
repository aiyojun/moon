#include "IValue.h"

bool IValue::hasRef() { return _ref != nullptr; }

jlib::Ref *IValue::getRef() { return _ref; }

void IValue::setRef(jlib::Ref *ref) { _ref = ref; }

void IValue::clearRef() { _ref = nullptr; }

std::string IValue::toString() { return ""; }