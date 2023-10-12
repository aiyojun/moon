#include "PsiElement.h"

PsiElement *PsiElement::relate(PsiElement *p) {
    _parent = p;
    if (std::find(p->_children.begin(),
                  p->_children.end(), p) == p->_children.end())
        p->_children.emplace_back(this);
    return this;
}

PsiElement *PsiElement::loc(int line, int start, int end) {
    _textRange.line = line;
    _textRange.start = start;
    _textRange.end = end;
    return this;
}
