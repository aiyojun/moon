#include "PsiElementTraverser.h"

void PsiElementTraverser::walk(PsiElement *e) {
    if (!e) return;
    if (onBefore(e)) return;
    for (auto child : e->children()) walk(child);
    onAfter(e);
}
