#include "Organizer.h"
#include "ValueSystem.h"
#include "DeclarativeClassValue.h"
#include "DeclarativeFunctionValue.h"
#include "debug/Debugger.h"

Organizer::Organizer() : _globalScope(new Scope("global")) {

}

Organizer::~Organizer() {
    delete _globalScope;
}

SymbolProvider *Organizer::createFunctionScope() {
//    Debug() << "_globalScope : " << _globalScope->toString() << Debugger::_end;
    return new SymbolProvider({_globalScope});
}

void Organizer::scanClass(ClassDeclaration *decl) {
    setGlobalSymbol(decl->getId()->getName(), ValueSystem::buildDeclarativeClass(decl));
}

void Organizer::scanFunction(FunctionDeclaration *decl) {
    setGlobalSymbol(decl->getId()->getName(), ValueSystem::buildDeclarativeFunction(decl));
}

void Organizer::scanVariable(VariableDeclaration *decl) {
    // todo:
}

void Organizer::setGlobalSymbol(const std::string &name, IValue *value) {
    _globalScope->add(Symbol::build(name, value));
}

void Organizer::removeGlobalSymbol(const std::string &name) {
    _globalScope->remove(name);
}

std::string Organizer::toString() {
    return _globalScope->toString();
}

int Organizer::getGlobalSymbolNumber() {
    return _globalScope->getNumber();
}
