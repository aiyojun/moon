#ifndef MOONCPP_DEBUGGER_H
#define MOONCPP_DEBUGGER_H

#include <string>
#include "PsiElement.h"
#include "IValue.h"

class Debugger {
public:
    enum End { _end };

    static Debugger &Get();

    Debugger& debug(const std::string &s);

    Debugger& operator<<(const std::string &s);

    Debugger& operator<<(int n);

    Debugger& operator<<(float n);

    Debugger& operator<<(double n);

    Debugger& operator<<(char n);

    Debugger& operator<<(PsiElement *e);

    Debugger& operator<<(IValue *e);

    Debugger& operator<<(End e);

    Debugger& flush();

private:
    Debugger& cache(const std::string &s);

private:
    static Debugger *_self;

    std::string _buf;
};

#define Debug() Debugger::Get()

#endif //MOONCPP_DEBUGGER_H
