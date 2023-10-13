#include "ParseTreeTraverser.h"

void ParseTreeTraverser::traverse(ParseTree *tree) {
    if (!tree) return;
    if (onBefore(tree)) return;
    for (auto child : tree->children) {
        this->traverse(child);
    }
    onAfter(tree);
}
