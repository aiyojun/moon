#include "ReturnStatement.h"

void ReturnStatement::setArgument(Expression *e) {
    _argument = e;// e->relate(this);
}

PsiElement *ReturnStatement::mount() {
    if(_argument) {
        _argument->mount();
        _argument->relate(this);
    }
    return this;
}

json ReturnStatement::toJson() {
    json nil{{"nil", nullptr}};
    return {
        {"type", "ReturnStatement"},
        {"argument", _argument ? _argument->toJson() : nil["nil"]}
    };
}

nlohmann::json ReturnStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "ReturnStatement";
    return _j;
}
