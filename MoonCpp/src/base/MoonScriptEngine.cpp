#include "MoonScriptEngine.h"
#include "PsiBuilder.h"
#include "VirtualMachine.h"
#include "types.h"
#include "Console.h"
#include "SymbolProvider.h"
#include "BuiltinFunctionValue.h"
#include "debug/Debugger.h"

class BuiltinPrintln : public BuiltinFunctionValue {
public:
    IValue *invoke(std::vector<IValue *> args) override;
};

IValue *BuiltinPrintln::invoke(std::vector<IValue *> args) {
    std::string stream;
    for (auto arg : args) {
        stream.append(arg->toString());
    }
    Console::Get()->info(stream);
    return nullptr;
}

MoonScriptEngine::MoonScriptEngine()
        :
          _org(new Organizer),
          _builder(new PsiBuilder),
          _vm(new VirtualMachine()),
          _program(nullptr) {
}

void MoonScriptEngine::compile(const std::string &path) {
    _builder->compile(path);
    _program = _builder->getProgram();
    for (auto decl: _program->getBody()) {
        // todo:
        if (instanceof<FunctionDeclaration *>(decl)) {
            auto func = dynamic_cast<FunctionDeclaration *>(decl);
            _org->scanFunction(func);
            _vm->compile(func);
            continue;
        }
        if (instanceof<ClassDeclaration *>(decl)) {
            _org->scanClass(as<ClassDeclaration *>(decl));
        }
    }
    _org->setGlobalSymbol("println", new BuiltinPrintln);
}

IValue *MoonScriptEngine::run() {
//    std::cout << "[LANG] run" << std::endl;
    auto _main = new CallExpression;
    _main->setCallee(Identifier::build("main"));
    _main->mount();
    return _vm->evaluate(_org->createFunctionScope(), _main);
}
