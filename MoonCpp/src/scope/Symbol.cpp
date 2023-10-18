#include "Symbol.h"
#include "types.h"
#include "BuiltinProvider.h"

Symbol *Symbol::build(Identifier *id, PsiElement *value) {
    if (instanceof<Literal *>(value)) { return new Symbol(id, value, LITERAL); }
    if (instanceof<BuiltinProvider *>(value)) { return new Symbol(id, value, BUILTIN_FUNCTION); }
    if (instanceof<ClassDeclaration *>(value)) { return new Symbol(id, value, DECL_CLASS); }
    if (instanceof<VariableDeclaration *>(value)) { return new Symbol(id, value, DECL_VARIABLE); }
    if (instanceof<FunctionDeclaration *>(value)) { return new Symbol(id, value, DECL_FUNCTION); }
    return nullptr;
}

std::string Symbol::toString() {
    std::string ss;
    switch (_type) {
        case LITERAL:
            ss = "literal " + _value->toString();
            break;
        case DECL_CLASS:
            ss = "decl class " + getName();
            break;
        case DECL_FUNCTION:
            ss = "decl function " + getName();
            break;
        case DECL_VARIABLE:
            ss = "decl variable " + getName();
            break;
        case BUILTIN_FUNCTION:
            ss = "builtin function " + getName();
            break;
        default:
            ss = "undefined symbol";
    }
    return std::move(ss);
}

void Symbol::setValue(PsiElement *value) {
    if (instanceof<Literal *>(value)) { _type = LITERAL; _value = value; return; }
    if (instanceof<BuiltinProvider *>(value)) { _type = BUILTIN_FUNCTION; _value = value; return; }
    if (instanceof<ClassDeclaration *>(value)) { _type = DECL_CLASS; _value = value; return; }
    if (instanceof<VariableDeclaration *>(value)) { _type = DECL_VARIABLE; _value = value; return; }
    if (instanceof<FunctionDeclaration *>(value)) { _type = DECL_FUNCTION; _value = value; return; }
}
