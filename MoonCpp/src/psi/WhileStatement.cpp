#include "WhileStatement.h"

void WhileStatement::setTest(Expression *e) {
    _test = e;// e->relate(this);
}

void WhileStatement::setBody(BlockStatement *s) {
    _body = s;// s->relate(this);
}

PsiElement *WhileStatement::mount() {
    _test->mount();
    _body->mount();
    _test->relate(this);
    _body->relate(this);
    return this;
}

json WhileStatement::toJson() {
    return {
            {"type", "WhileStatement"},
            {"test", _test->toJson()},
            {"body", _body->toJson()}
    };
}

nlohmann::json WhileStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "WhileStatement";
    return _j;
}


