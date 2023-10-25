#include "IValue.h"

bool IValue::hasRef() { return _ref != nullptr; }

std::shared_ptr<jlib::Ref> IValue::getRef() { return _ref; }

void IValue::setRef(const std::shared_ptr<jlib::Ref> &ref) { _ref = ref; }

void IValue::clearRef() { _ref = nullptr; }

std::string IValue::toString() { return ""; }