#include "ForStatement.h"

void ForStatement::setInit(Expression *e) {
    _init = e;// e->relate(this);
}

void ForStatement::setTest(Expression *e) {
    _test = e;// e->relate(this);
}

void ForStatement::setUpdate(Expression *e) {
    _update = e;// e->relate(this);
}

void ForStatement::setBody(BlockStatement *e) {
    _body = e;// e->relate(this);
}

PsiElement *ForStatement::mount() {
    if (_init) {
        _init->mount();
        _init->relate(this);
    }
    if (_test) {
        _test->mount();
        _test->relate(this);
    }
    if (_update) {
        _update->mount();
        _update->relate(this);
    }
    _body->mount();
    _body->relate(this);
    return this;
}

json ForStatement::toJson() {
    json nil{{"nil", nullptr}};
    return {
        {"type", "ForStatement"},
        {"init", _init ? _init->toJson() : nil["nil"]},
        {"test", _test ? _test->toJson() : nil["nil"]},
        {"update", _update ? _update->toJson() : nil["nil"]},
        {"body", _body->toJson()}
    };
}

nlohmann::json ForStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "ForStatement";
    return _j;
}
