#ifndef MOONCPP_PSIELEMENT_H
#define MOONCPP_PSIELEMENT_H

#include <vector>
#include <string>

#include "TextRange.h"

class PsiElement {
public:
    PsiElement *parent() { return _parent; }

    std::vector<PsiElement *> &children() { return _children; }

    TextRange &textRange() { return _textRange; }

    PsiElement *relate(PsiElement *p);

    PsiElement *loc(int line, int start, int end);

    virtual std::string toString() { return ""; };

private:
    TextRange _textRange;

    PsiElement *_parent;

    std::vector<PsiElement *> _children;
};


#endif //MOONCPP_PSIELEMENT_H
