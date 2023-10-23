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
            return _r;
        }
    }
    return nullptr;
}

void SymbolProvider::buildScope() {
//    std::cout << "|++ push scope " << _nestedScopes.size() << std::endl;
    _nestedScopes.emplace_back(new Scope());
}

void SymbolProvider::popScope() {
//    std::cout << "|-- pop scope " << _nestedScopes.size() << std::endl;
    delete _nestedScopes.back();
    _nestedScopes.pop_back();
}

void SymbolProvider::scan(Symbol *symbol) {
    if (symbol == nullptr) {
        std::cout << "warning: nullptr symbol\n";
        return;
    }
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
        auto _scope = _nestedScopes[i];
        stream += std::to_string(i) + ":\n";
        std::cout << "=> scope " <<  i << " " << _scope << " " << _scope->_symbols.size() << std::endl;
        for (const auto &item: _scope->_symbols) {
            stream += "  " + item.first + " " + item.second->toString() + "\n";
        }
    }
    return stream;
}
