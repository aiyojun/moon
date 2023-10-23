#include "ThrowStatement.h"

void ThrowStatement::setArgument(Expression *e) {
    _argument = e;// e->relate(this);
}

PsiElement *ThrowStatement::mount() {
    _argument->mount();
    _argument->relate(this);
    return this;
}

json ThrowStatement::toJson() {
    return {
            {"type", "ThrowStatement"},
            {"argument", _argument->toJson()}
    };
}

nlohmann::json ThrowStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "ThrowStatement";
    return _j;
}
