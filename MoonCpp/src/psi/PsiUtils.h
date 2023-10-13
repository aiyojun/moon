#ifndef MOONCPP_PSIUTILS_H
#define MOONCPP_PSIUTILS_H

#include "antlr4-runtime.h"

using antlr4::Token;
using antlr4::tree::ParseTree;
using antlr4::tree::ParseTreeType;
using antlr4::tree::TerminalNode;
using antlr4::ParserRuleContext;

class PsiUtils {
public:
    static bool isRule(ParseTree *tree);

    static bool isError(ParseTree *tree);

    static bool isTerm(ParseTree *tree);

    static bool isProgramContext(ParseTree *tree);

    static bool isClassDeclarationContext(ParseTree *tree);

    static bool isVariableDeclarationContext(ParseTree *tree);

    static bool isFunctionDeclarationContext(ParseTree *tree);

    static bool isExpressionContext(ParseTree *tree);

    static bool isStatementsContext(ParseTree *tree);

    static bool isIfStatementsContext(ParseTree *tree);

    static bool isWhileStatementsContext(ParseTree *tree);

    static bool isForStatementsContext(ParseTree *tree);

    static bool isReturnStatementsContext(ParseTree *tree);

    static bool isBreakStatementsContext(ParseTree *tree);

    static bool isContinueStatementsContext(ParseTree *tree);

    static bool isBlockStatementsContext(ParseTree *tree);

    static std::vector<TerminalNode> findTerminals(std::vector<ParseTree*>& children, size_t term);

    static ParserRuleContext* findFirstParserRule(std::vector<ParseTree*>& children, size_t rule);
};


#endif //MOONCPP_PSIUTILS_H
