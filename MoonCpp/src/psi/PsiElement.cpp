#include "PsiElement.h"
#include "PsiUtils.h"
#include "types.h"

using antlr4::Token;
using antlr4::tree::TerminalNode;
using antlr4::ParserRuleContext;

PsiElement *PsiElement::relate(PsiElement *p) {
    if (p == nullptr) return this;
    _parent = p;
    auto &children = _parent->_children;
    if (std::find(children.begin(),
                  children.end(), this) == children.end()) {
//        std::cout << "relate " << ( p ? to_string(p->toJson()) : "null") << "  => " << to_string(this->toJson()) << std::endl;
        children.emplace_back(this);
    }
    return this;
}

PsiElement *PsiElement::loc(ParseTree *tree) {
    if (PsiUtils::isRule(tree)) {
        auto *rule = dynamic_cast<ParserRuleContext *>(tree);
        Token *start = rule->getStart();
        Token *stop = rule->getStop();
        _textRange.line = start->getLine();
        _textRange.start = start->getStartIndex();
        _textRange.end = stop->getStopIndex();
    } else if (PsiUtils::isTerm(tree)) {
        Token *token = dynamic_cast<TerminalNode *>(tree)->getSymbol();
        _textRange.line = token->getLine();
        _textRange.start = token->getStartIndex();
        _textRange.end = token->getStopIndex();
    }
    return this;
}

std::string PsiElement::toString() {
    std::string stream;
    for (auto child: _children) {
        stream.append(child->toString());
    }
    return stream;
}

PsiElement *PsiElement::mount() {
    if (!instanceof<Literal *>(this) && !instanceof<Identifier *>(this)) {
        std::cout << "!!! mount " << to_string(toJson()) <<  std::endl;
    }
    return this;
}

nlohmann::json PsiElement::toJson() {
    return {};
}

nlohmann::json PsiElement::toJsonTree() {
    auto arr = json::array();
    for (const auto &item: children()) {
        arr.emplace_back(item->toJsonTree());
    }
    return {{"children", arr}};
}
