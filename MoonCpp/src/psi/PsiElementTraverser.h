#ifndef MOONCPP_PSIELEMENTTRAVERSER_H
#define MOONCPP_PSIELEMENTTRAVERSER_H

#include "PsiElement.h"

class PsiElementTraverser {
public:
    void walk(PsiElement *e);

protected:
    virtual bool onBefore(PsiElement *e) = 0;

    virtual void onAfter(PsiElement *e) = 0;
};


#endif //MOONCPP_PSIELEMENTTRAVERSER_H
