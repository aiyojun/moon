#include "Variable.h"
#include "SyntaxError.h"
#include "types.h"
#include <iostream>
#include <string>

Object::Object() : _refCount(0) {
    std::cout << "create object" << std::endl;
}

Object::~Object() {
    std::cout << "destroy object" << std::endl;
}

size_t Object::addRef() {
    ++_refCount;
    std::cout << "ref : " << std::to_string(_refCount) << std::endl;
    return _refCount;
}

size_t Object::subRef() {
    return --_refCount;
}

PsiElement *Object::get(const std::string &property) {
    auto value = _properties[property];
    if (value == nullptr)
        throw SyntaxError("No such property : " + property);
    return value;
}

void Object::set(const std::string &property, PsiElement *value) {
    if (!instanceof<Object *>(value) && !instanceof<Literal *>(value))
        throw SyntaxError("interpret error!");
    _properties[property] = value;
}

Variable::Variable() : _ref(nullptr) {

}

Variable::Variable(Object *obj) {
    _ref = obj;
    _ref->addRef();
}

Variable::Variable(Variable &v) {
    if (v._ref) {
        _ref = v._ref;
        _ref->addRef();
    }
}

Variable::Variable(Variable *v) {
    if (this == v) return;
    if (v->_ref) {
        _ref = v->_ref;
        _ref->addRef();
    }
}

Variable::~Variable() {
    if (_ref)
        if (_ref->subRef() == 0)
            delete _ref;
}

Variable &Variable::operator=(Variable &obj) {
    if (_ref != obj._ref) {
        if (_ref)
            _ref->subRef();
        if (obj._ref)
            obj._ref->addRef();
        _ref = obj._ref;
    }
    return *this;
}


