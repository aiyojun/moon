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
        Debug() << "decl : " << decl << Debugger::_end;
        if (instanceof<FunctionDeclaration *>(decl)) {
            auto func = dynamic_cast<FunctionDeclaration *>(decl);
            _org->scanFunction(func);
//            _globalScope->add(Symbol::build(func->getId()->getName(), func));
            _vm->compile(func);
            continue;
        }
        if (instanceof<ClassDeclaration *>(decl)) {
            _org->scanClass(as<ClassDeclaration *>(decl));
        }
    }
    _org->setGlobalSymbol("println", new BuiltinPrintln);
    std::cout << "Organizer : \n---" << _org->getGlobalSymbolNumber() << "\n" << _org->toString() << "\n---" << std::endl;
//    Debug() << "Organizer : " << _org->toString() << Debugger::_end;
//    Debug() << "Global symbol table : \n" << _org->createFunctionScope()->toString() << Debugger::_end;
//    _globalScope->add(Symbol::build("println", new BuiltinPrintln));
}

IValue *MoonScriptEngine::run() {
    auto _main = new CallExpression;
    _main->setCallee(Identifier::build("main"));
    return _vm->evaluate(_org->createFunctionScope(), _main);
//    return _vm->evaluate(createFunctionScope(), _main);
}
