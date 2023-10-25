#ifndef MOONCPP_SYMBOL_H
#define MOONCPP_SYMBOL_H

#include "PsiElement.h"
#include "FunctionDeclaration.h"
#include "VariableDeclaration.h"
#include "ClassDeclaration.h"
#include "Literal.h"
#include "IValue.h"

class Symbol {
public:
    enum SymbolType {
        LITERAL, BUILTIN_FUNCTION, DECL_FUNCTION, DECL_CLASS, DECL_VARIABLE, OBJECT
    };

    template<class T>
    T getAs();

    std::shared_ptr<IValue> get() { return _value; }

    static Symbol *build(const std::string& id, const std::shared_ptr<IValue> &value);

    const std::string& getName() { return _id; }

    std::string toString();

    void setValue(const std::shared_ptr<IValue> &value);

    bool callable() { return _type == BUILTIN_FUNCTION || _type == DECL_FUNCTION; }

    bool isBuiltinFunction() { return _type == BUILTIN_FUNCTION; }

private:
    Symbol(std::string id, std::shared_ptr<IValue> value, SymbolType type)
            : _id(std::move(id)), _value(value), _type(type) {}

private:
    std::string _id;

    std::shared_ptr<IValue> _value;

    SymbolType _type;
};

template<class T>
T Symbol::getAs() { return dynamic_cast<T>(_value); }


#endif //MOONCPP_SYMBOL_H
