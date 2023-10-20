#ifndef MOONCPP_DECLARATIVECLASSVALUE_H
#define MOONCPP_DECLARATIVECLASSVALUE_H

#include "ObjectValue.h"
#include "ClassDeclaration.h"

class DeclarativeClassValue : public ObjectValue {
public:
    explicit DeclarativeClassValue(ClassDeclaration *clazz);

    std::string toString() override { return "DeclarativeClassValue"; }

    ClassDeclaration *getClazz() { return _clazz; }

private:
    ClassDeclaration *_clazz;
};

#endif //MOONCPP_DECLARATIVECLASSVALUE_H
