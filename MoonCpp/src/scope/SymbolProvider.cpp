#include "SymbolProvider.h"

bool SymbolProvider::contains(const std::string &id) {
    for (int i = (int) _nestedScopes.size() - 1; i > -1; i--) {
        if (_nestedScopes[i]->contains(id))
            return true;
    }
    return false;
}

Symbol *SymbolProvider::get(const std::string &id) {
    for (int i = (int) _nestedScopes.size() - 1; i > -1; i--) {
        auto _r = _nestedScopes[i]->get(id);
        if (_r) {
//            std::cout << " get " << id << " = " << _r->get()->toString() << std::endl;
            return _r;
        }
    }
    return nullptr;
}

void SymbolProvider::buildScope() {
    _nestedScopes.emplace_back(new Scope());
}

void SymbolProvider::popScope() {
    delete _nestedScopes.back();
    _nestedScopes.pop_back();
}

void SymbolProvider::scan(Symbol *symbol) {
    auto sym = get(symbol->getName());
    if (!sym) { add(symbol); return; }
    sym->setValue(symbol->get());
}

void SymbolProvider::add(Symbol *symbol) {
    auto scope = _nestedScopes.back();
    scope->add(symbol);
}

SymbolProvider *SymbolProvider::derive(Scope *scope) {
    std::vector<Scope *> _r;
    _r.reserve(_nestedScopes.size() + 1);
    for (auto & _nestedScope : _nestedScopes) {
        _r.emplace_back(_nestedScope);
    }
    _r.emplace_back(scope);
    return new SymbolProvider(_r);
}

std::string SymbolProvider::toString() {
    std::string stream;
    for (int i = 0; i < _nestedScopes.size(); i++) {
        stream.append(_nestedScopes[i]->toString());
    }
    return stream;
}
