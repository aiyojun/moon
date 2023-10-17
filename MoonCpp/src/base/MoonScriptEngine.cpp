#include "MoonScriptEngine.h"
#include "Runtime.h"
#include "PsiBuilder.h"
#include "VirtualMachine.h"
#include "Evaluator.h"
#include "../types.h"
#include "Console.h"

class BuiltinPrintln : public BuiltinProvider {
public:
    Literal *apply(const std::vector<Literal *> &args) override;
};

Literal *BuiltinPrintln::apply(const std::vector<Literal *> &args) {
    std::string stream;
    for (int i = 0; i < args.size(); i++) {
        stream.append(args[i]->toString());
    }
    Console::Get()->info(stream);
    return nullptr;
}

MoonScriptEngine::MoonScriptEngine()
    : _rt(new Runtime),
      _builder(new PsiBuilder),
      _evaluator(new Evaluator(this)),
      _vm(new VirtualMachine(this)) {
}

void MoonScriptEngine::compile(const std::string &path) {
    std::cout << "[LANG] Compiling ..." << std::endl;
    _builder->compile(path);
    _program = _builder->getProgram();
    for (auto decl : _program->getBody()) {
//        std::cout << "[LANG] " << "unfold decls : " << _program->getBody().size() << std::endl;
        // TODO:
        if (instanceof<FunctionDeclaration *>(decl)) {
            auto func = dynamic_cast<FunctionDeclaration *>(decl);
//            std::cout << "[LANG] VirtualMachine is compiling decl : "
//                << func->getId()->getName() << std::endl;
            _rt->record(func->getId()->getName(), func);
            _vm->compile(func);
            continue;
        }
    }
    _rt->record("println", new BuiltinPrintln);
}

Literal *MoonScriptEngine::run() {
    std::cout << "[LANG] Run" << std::endl;
    auto _main = new CallExpression;
    _main->setCallee(Identifier::build("main"));
    return _evaluator->evaluate(_main);
}
