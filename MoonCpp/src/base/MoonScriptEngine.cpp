#include "MoonScriptEngine.h"
#include "PsiBuilder.h"
#include "VirtualMachine.h"
#include "Evaluator.h"
#include "types.h"
#include "Console.h"
#include "SymbolProvider.h"
#include "BuiltinProvider.h"

class BuiltinPrintln : public BuiltinProvider {
public:
    Literal *apply(const std::vector<Literal *> &args) override;
};

Literal *BuiltinPrintln::apply(const std::vector<Literal *> &args) {
    std::string stream;
    for (auto arg : args) {
        stream.append(arg->toString());
    }
    Console::Get()->info(stream);
    return nullptr;
}

MoonScriptEngine::MoonScriptEngine()
        :
          _globalScope(new Scope),
          _builder(new PsiBuilder),
          _vm(new VirtualMachine(this)),
          _program(nullptr) {
}

void MoonScriptEngine::compile(const std::string &path) {
    _builder->compile(path);
    _program = _builder->getProgram();
    for (auto decl: _program->getBody()) {
        // todo:
        if (instanceof<FunctionDeclaration *>(decl)) {
            auto func = dynamic_cast<FunctionDeclaration *>(decl);
            _globalScope->add(Symbol::build(func->getId(), func));
            _vm->compile(func);
            continue;
        }
    }
    _globalScope->add(Symbol::build(Identifier::build("println"), new BuiltinPrintln));
}

Literal *MoonScriptEngine::run() {
    auto _main = new CallExpression;
    _main->setCallee(Identifier::build("main"));
    return _vm->evaluate(createFunctionScope(), _main);
}
