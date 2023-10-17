#include "Runtime.h"
#include "SyntaxError.h"

PtGbl *PtGbl::self = new PtGbl;

Runtime::Runtime() {
    _callstack.emplace_back(PtGbl::self);
}

void Runtime::record(const std::string &id, PsiElement *entity) {
    std::cout << "[LANG] Record : " << id << " = " << entity->toString() << std::endl;
    auto ptr = ref(id);
    if (ptr) {
        (*ptr)[id] = entity;
    } else {
        _callstack.back()->sblTbl[id] = entity;
    }
}

PsiElement *Runtime::exchange(Identifier *id) {
    auto ptr = ref(id->getName());
    if (!ptr)
        throw SyntaxError("No such identifier : " + id->getName());
    std::cout << "[LANG] Exchange : " << id->getName() << " = " << (*ptr)[id->getName()]->toString() << std::endl;
    return (*ptr)[id->getName()];
}

PtCall *Runtime::func() {
    for (int i = (int) _callstack.size() - 1; i > -1; i--) {
        auto sco = _callstack[i];
        if (typeid(sco) == typeid(PtCall))
            return static_cast<PtCall *>(sco);
    }
    return nullptr;
}

std::map<std::string, PsiElement *> *Runtime::ref(const std::string &id) {
    int idx = (int) _callstack.size() - 1;
    while (idx > -1) {
        auto sblTbl = _callstack[idx]->sblTbl;
        if (sblTbl.find(id) != sblTbl.end())
            return &(_callstack[idx]->sblTbl);
        idx--;
    }
    return nullptr;
}

void Runtime::push(StkPt *pt) {
    _callstack.emplace_back(pt);
}

StkPt *Runtime::pop() {
    auto _r = _callstack.back();
    _callstack.pop_back();
    return _r;
}
