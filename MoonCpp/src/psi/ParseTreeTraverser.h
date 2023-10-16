#ifndef MOONCPP_PARSETREETRAVERSER_H
#define MOONCPP_PARSETREETRAVERSER_H

#include "antlr4-runtime.h"

using antlr4::tree::ParseTree;

class ParseTreeTraverser {
protected:
    virtual bool onBefore(ParseTree *tree) = 0;

    virtual void onAfter(ParseTree *tree) = 0;

    void traverse(ParseTree *tree);
};


#endif //MOONCPP_PARSETREETRAVERSER_H
