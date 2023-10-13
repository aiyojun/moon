#include "CallExpression.h"

void CallExpression::setCallee(Expression *callee) {
    _callee = callee;
}

std::string CallExpression::toString() {
    std::string s;
    s.append(_callee->toString());
    s.append(" (");
    for (int i = 0; i < _arguments.size(); i++) {
        auto arg = _arguments[i];
        if (!i) s.append(", ");
        s.append(arg->toString());
    }
    s.append(" )");
    return s;
}
