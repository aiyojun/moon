#include "DeclarativeClassValue.h"

DeclarativeClassValue::DeclarativeClassValue(ClassDeclaration *clazz)
    : _clazz(clazz) {
    _isNull = false;
}
