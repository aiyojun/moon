#include "Debugger.h"
#include <iostream>

Debugger *Debugger::_self = nullptr;

Debugger &Debugger::Get() {
    if (!Debugger::_self)
        Debugger::_self = new Debugger;
    return *_self;
}

Debugger &Debugger::debug(const std::string &s) {
    std::cout << "[LANG] " << s << std::endl;
    return *this;
}

Debugger &Debugger::operator<<(const std::string &s) {
    return cache(s);
}

Debugger &Debugger::operator<<(int n) {
    return cache(std::to_string(n));
}

Debugger &Debugger::operator<<(float n) {
    return cache(std::to_string(n));
}

Debugger &Debugger::operator<<(double n) {
    return cache(std::to_string(n));
}

Debugger &Debugger::operator<<(char n) {
    return cache(std::to_string(n));
}

Debugger &Debugger::operator<<(PsiElement *e) {
    return cache(!e ? "null" : e->toString());
}

Debugger &Debugger::operator<<(IValue *e) {
    return cache(!e ? "null" : e->toString());
}

Debugger &Debugger::cache(const std::string &s) {
    _buf += s;
    return *this;
}

Debugger &Debugger::flush() {
    return debug(_buf);
}

Debugger &Debugger::operator<<(Debugger::End e) {
    return flush();
}
