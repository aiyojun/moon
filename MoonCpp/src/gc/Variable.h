#ifndef MOONCPP_VARIABLE_H
#define MOONCPP_VARIABLE_H

#include <map>
#include <vector>
#include "psi.h"

class Object;

class Variable;

class Object : public PsiElement {
public:
    Object();

    ~Object();

    PsiElement *get(const std::string &property);

    void set(const std::string &property, PsiElement *value);

private:
    size_t addRef();

    size_t subRef();

private:
    size_t _refCount;

    std::map<std::string, PsiElement *> _properties;

    friend class Variable;
};

class ClassDeclarationObject : public Object {
public:
    explicit ClassDeclarationObject(ClassDeclaration *decl) : Object(), _prototype(decl) {}

    ClassDeclaration *prototype() { return _prototype; }

private:
    ClassDeclaration *_prototype;
};

class Variable {
public:
    Variable();

    Variable(Variable &v);

    Variable(Variable *v);

    Variable(Object *obj);

    ~Variable();

    Variable &operator=(Variable &obj);

private:
    Object *_ref;
};


#endif //MOONCPP_VARIABLE_H
