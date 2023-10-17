#include "PsiElement.h"
#include "PsiUtils.h"
#include "TerminalExpression.h"
#include "types.h"
#include "Identifier.h"
#include "Literal.h"

using antlr4::Token;
using antlr4::tree::TerminalNode;
using antlr4::ParserRuleContext;

PsiElement *PsiElement::relate(PsiElement *p) {
    _parent = p;
    if (std::find(p->_children.begin(),
                  p->_children.end(), p) == p->_children.end())
        p->_children.emplace_back(this);
    return this;
}

PsiElement *PsiElement::loc(ParseTree* tree) {
    if (PsiUtils::isRule(tree)) {
        auto* rule = dynamic_cast<ParserRuleContext*>(tree);
        Token* start = rule->getStart();
        Token* stop  = rule->getStop();
        _textRange.line = start->getLine();
        _textRange.start = start->getStartIndex();
        _textRange.end = stop->getStopIndex();
    } else if (PsiUtils::isTerm(tree)) {
        Token* token = dynamic_cast<TerminalNode*>(tree)->getSymbol();
        _textRange.line = token->getLine();
        _textRange.start = token->getStartIndex();
        _textRange.end = token->getStopIndex();
    }
    return this;
}

std::string PsiElement::toString() {
    std::string stream;
    for (auto child : _children) {
        stream.append(child->toString());
    }
    return stream;
}
