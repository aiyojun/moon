#include "CatchStatement.h"

void CatchStatement::setParam(Identifier *id) {
    _param = id;// id->relate(this);
}

void CatchStatement::setBody(BlockStatement *b) {
    _body = b;// b->relate(this);
}

PsiElement *CatchStatement::mount() {
    _param->relate(this);
    _body->relate(this);
    _param->mount();
    _body->mount();
    return this;
}

json CatchStatement::toJson() {
    return {
            {"type", "CatchStatement"},
            {"param", _param->toJson()},
            {"body", _body->toJson()},
    };
}

nlohmann::json CatchStatement::toJsonTree() {
    auto _j = PsiElement::toJsonTree();
    _j["type"] = "CatchStatement";
    return _j;
}
