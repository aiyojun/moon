#ifndef MOONCPP_PROGRAM_H
#define MOONCPP_PROGRAM_H

#include "PsiElement.h"
#include "Declaration.h"

class Program : public PsiElement {
public:
    std::vector<Declaration*>& getbody() {return _body;}

private:
    std::vector<Declaration*> _body;
};


#endif //MOONCPP_PROGRAM_H
