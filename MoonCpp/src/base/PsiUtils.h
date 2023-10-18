#ifndef MOONCPP_PSIUTILS_H
#define MOONCPP_PSIUTILS_H

#include "psi.h"

class PsiUtils {
public:
    static bool isRule(ParseTree *tree);

    static bool isError(ParseTree *tree);

    static bool isTerm(ParseTree *tree);

    static bool isTermOf(ParseTree *tree, size_t tokenType);

    static bool isProgramContext(ParseTree *tree);

    static bool isClassDeclarationContext(ParseTree *tree);

    static bool isVariableDeclarationContext(ParseTree *tree);

    static bool isFunctionDeclarationContext(ParseTree *tree);

    static bool isExpressionContext(ParseTree *tree);

    static bool isStatementsContext(ParseTree *tree);

    static bool isIfStatementContext(ParseTree *tree);

    static bool isWhileStatementContext(ParseTree *tree);

    static bool isForStatementContext(ParseTree *tree);

    static bool isTryStatementContext(ParseTree *tree);

    static bool isReturnStatementContext(ParseTree *tree);

    static bool isBreakStatementContext(ParseTree *tree);

    static bool isThrowStatementContext(ParseTree *tree);

    static bool isContinueStatementContext(ParseTree *tree);

    static bool isBlockStatementContext(ParseTree *tree);

    static std::vector<TerminalNode *> findTerminals(std::vector<ParseTree *> &children, size_t term);

    static ParserRuleContext *findFirstParserRule(std::vector<ParseTree *> &children, size_t rule);
};

#endif //MOONCPP_PSIUTILS_H
