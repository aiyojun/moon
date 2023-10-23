#include "TryStatement.h"

void TryStatement::setBlock(BlockStatement *s) {
    _block = s;// s->relate(this);
}

void TryStatement::setHandler(CatchStatement *s) {
    _handler = s;// s->relate(this);
}

void TryStatement::setFinalizer(BlockStatement *s) {
    _finalizer = s;// s->relate(this);
}

PsiElement *TryStatement::mount() {
    _handler->mount();
    _handler->relate(this);
    _block->mount();
    _block->relate(this);
    if (_finalizer) {
        _finalizer->mount();
        _finalizer->relate(this);
    }
    return this;
}

json TryStatement::toJson() {
    json nil{{"nil", nullptr}};
    return {
            {"type", "TryStatement"},
            {"handler", _handler->toJson()},
            {"block", _block->toJson()},
            {"finalizer", _finalizer ? _finalizer->toJson() : nil["nil"]},
    };
}

nlohmann::json TryStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "TryStatement";
    return _j;
}
