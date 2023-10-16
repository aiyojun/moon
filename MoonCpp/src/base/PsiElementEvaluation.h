#ifndef MOONCPP_PSIELEMENTEVALUATION_H
#define MOONCPP_PSIELEMENTEVALUATION_H

#include "PsiElementTraverser.h"
#include "TerminalExpression.h"

class PsiElementEvaluation : public PsiElementTraverser {
public:
    PsiElementEvaluation(std::vector<TerminalExpression *> &stack) : _stack(stack) {}

protected:
    bool onBefore(PsiElement *e) override;

    void onAfter(PsiElement *e) override;

private:
    std::vector<TerminalExpression *> &_stack;
};


#endif //MOONCPP_PSIELEMENTEVALUATION_H
