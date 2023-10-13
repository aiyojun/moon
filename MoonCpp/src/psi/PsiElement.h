#ifndef MOONCPP_PSIELEMENT_H
#define MOONCPP_PSIELEMENT_H

#include <vector>
#include <string>

#include "TextRange.h"
#include "antlr4-runtime.h"

using antlr4::tree::ParseTree;

class PsiElement {
public:
    PsiElement *parent() { return _parent; }

    std::vector<PsiElement *> &children() { return _children; }

    TextRange &textRange() { return _textRange; }

    PsiElement *relate(PsiElement *p);

    PsiElement *loc(ParseTree* tree);

    virtual std::string toString() { return ""; };

private:
    TextRange _textRange;

    PsiElement *_parent;

    std::vector<PsiElement *> _children;
};


#endif //MOONCPP_PSIELEMENT_H
