#include "IfStatement.h"

void IfStatement::setTest(Expression *e) {
    _test = e; e->relate(this);
}

void IfStatement::setConsequent(BlockStatement *s) {
    _consequent = s;
    s->relate(this);
}

void IfStatement::setAlternate(Statement *s) {
    _alternate = s; s->relate(this);
}

PsiElement *IfStatement::mount() {
    _test->mount();
    _test->relate(this);
    _consequent->mount();
    _consequent->relate(this);
    if (_alternate) {
        _alternate->mount();
        _alternate->relate(this);
    }
    return this;
}

json IfStatement::toJson() {
    json nil{{"nil", nullptr}};
    return {
            {"type", "IfStatement"},
            {"test", _test->toJson()},
            {"consequent", _consequent->toJson()},
            {"alternate", _alternate ? _alternate->toJson() : nil["nil"]}
    };
}

nlohmann::json IfStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "IfStatement";
    return _j;
}
