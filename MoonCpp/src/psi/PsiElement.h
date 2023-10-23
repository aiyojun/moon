#ifndef MOONCPP_PSIELEMENT_H
#define MOONCPP_PSIELEMENT_H

#include "json.hpp"
using nlohmann::json;

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

    virtual PsiElement *mount();

    PsiElement *loc(ParseTree *tree);

    virtual std::string toString();

    virtual nlohmann::json toJson();

    virtual nlohmann::json toJsonTree();

private:
    TextRange _textRange;

    PsiElement *_parent = nullptr;

    std::vector<PsiElement *> _children;
};

#endif //MOONCPP_PSIELEMENT_H
