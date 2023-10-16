#ifndef MOONCPP_MOONSCRIPTENGINE_H
#define MOONCPP_MOONSCRIPTENGINE_H

#include <string>
#include "Literal.h"
#include "Program.h"

class Runtime;

class Evaluator;

class PsiBuilder;

class VirtualMachine;

class MoonScriptEngine {
public:
    MoonScriptEngine();

    Runtime *runtime() { return _rt; }

    VirtualMachine *vm() { return _vm; }

    Evaluator *evaluator() { return _evaluator; }

    Program *program() { return _program; }

    void compile(const std::string &path);

    Literal *run();

private:
    Runtime *_rt;

    VirtualMachine *_vm;

    PsiBuilder *_builder;

    Evaluator *_evaluator;

    Program *_program;
};


#endif //MOONCPP_MOONSCRIPTENGINE_H
