#include "PsiElementEvaluation.h"
#include "CallExpression.h"
#include "../types.h"

bool PsiElementEvaluation::onBefore(PsiElement *e) {
    if (instanceof<CallExpression *>(e)) {

    }
    return false;
}

void PsiElementEvaluation::onAfter(PsiElement *e) {

}
