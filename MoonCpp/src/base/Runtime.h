#ifndef MOONCPP_RUNTIME_H
#define MOONCPP_RUNTIME_H

#include <map>
#include <vector>
#include <string>
#include "PsiElement.h"
#include "Literal.h"
#include "Identifier.h"

class BuiltinProvider : public PsiElement {
public:
    virtual Literal *apply(const std::vector<Literal *> &args) = 0;

    std::string toString() override { return "BuiltinProvider"; }
};

class StkPt {
public:
    StkPt(PsiElement *e): el(e) {}
    PsiElement *el;
    std::map<std::string, PsiElement *> sblTbl;
};

class PtGbl : public StkPt {
public:
    static PtGbl *self;
private:
    PtGbl(): StkPt(nullptr) {}
};

class PtCall : public StkPt {
public:
    PtCall(PsiElement *e): StkPt(e) {}
};

class PtLoop : public StkPt {
public:
    PtLoop(PsiElement *e): StkPt(e) {}
};

class PtBlk : public StkPt {
public:
    PtBlk(PsiElement *e): StkPt(e) {}
};

class Runtime {
public:
    Runtime();

    void record(const std::string& id, PsiElement* entity);

    PsiElement *exchange(Identifier *id);

    PtCall* func();

    std::map<std::string, PsiElement *> *ref(const std::string &id);

    void push(StkPt *pt);

    StkPt *pop();

private:
    std::vector<StkPt *> _callstack;
};


#endif //MOONCPP_RUNTIME_H
