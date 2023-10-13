#include "PsiUtils.h"
#include "MoonParser.h"

using antlr4::tree::ParseTreeType;
using antlr4::ParserRuleContext;

bool PsiUtils::isRule(ParseTree *tree) {
    return tree->getTreeType() == ParseTreeType::RULE;
}

bool PsiUtils::isError(ParseTree *tree) {
    return tree->getTreeType() == ParseTreeType::ERROR;
}

bool PsiUtils::isTerm(ParseTree *tree) {
    return tree->getTreeType() == ParseTreeType::TERMINAL;
}

bool PsiUtils::isProgramContext(ParseTree *tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleProgram;
}

bool PsiUtils::isClassDeclarationContext(ParseTree *tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleClassDeclaration;
}

bool PsiUtils::isVariableDeclarationContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleVariableDeclaration;
}

bool PsiUtils::isFunctionDeclarationContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleFunctionDeclaration;;
}

bool PsiUtils::isExpressionContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleExpression;;
}

bool PsiUtils::isStatementsContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleStatements;
}

bool PsiUtils::isIfStatementsContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleIfStatement;
}

bool PsiUtils::isWhileStatementsContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleWhileStatement;
}

bool PsiUtils::isForStatementsContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleForStatement;
}

bool PsiUtils::isReturnStatementsContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleReturnStatement;
}

bool PsiUtils::isBreakStatementsContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleBreakStatement;
}

bool PsiUtils::isContinueStatementsContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleContinueStatement;
}

bool PsiUtils::isBlockStatementsContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleBlockStatement;
}

std::vector<TerminalNode> PsiUtils::findTerminals(std::vector<ParseTree *> &children, size_t term) {
    std::vector<TerminalNode> _r;
    for (auto child : children) {
        if (isTerm(child) && dynamic_cast<TerminalNode*>(child)->getSymbol()->getType() == term)
            _r.emplace_back(child);
    }
    return _r;
}

ParserRuleContext* PsiUtils::findFirstParserRule(std::vector<ParseTree *> &children, size_t ruleIndex) {
    for (auto child : children) {
        if (!isRule(child)) continue;
        auto rule = dynamic_cast<ParserRuleContext*>(child);
        if (rule->getRuleIndex() == ruleIndex)
            return rule;
    }
    return nullptr;
}

