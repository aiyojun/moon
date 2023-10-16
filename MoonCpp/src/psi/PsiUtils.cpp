#include "PsiUtils.h"
#include "MoonParser.h"
#include "Literal.h"
#include "../types.h"

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

bool PsiUtils::isIfStatementContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleIfStatement;
}

bool PsiUtils::isWhileStatementContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleWhileStatement;
}

bool PsiUtils::isForStatementContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleForStatement;
}

bool PsiUtils::isTryStatementContext(ParseTree *tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleTryStatement;
}

bool PsiUtils::isReturnStatementContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleReturnStatement;
}

bool PsiUtils::isBreakStatementContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleBreakStatement;
}

bool PsiUtils::isThrowStatementContext(ParseTree *tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleThrowStatement;
}

bool PsiUtils::isContinueStatementContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleContinueStatement;
}

bool PsiUtils::isBlockStatementContext(ParseTree* tree) {
    return isRule(tree) && dynamic_cast<ParserRuleContext*>(tree)->getRuleIndex() == MoonParser::RuleBlockStatement;
}

std::vector<TerminalNode *> PsiUtils::findTerminals(std::vector<ParseTree *> &children, size_t term) {
    std::vector<TerminalNode *> _r;
    for (auto child : children) {
        if (isTerm(child)) {
            TerminalNode *pChild = dynamic_cast<TerminalNode *>(child);
            if (pChild->getSymbol()->getType() == term) {
                _r.emplace_back(pChild);
            }
        }
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

bool PsiUtils::isTermOf(ParseTree *tree, size_t tokenType) {
    return isTerm(tree) && dynamic_cast<TerminalNode*>(tree)->getSymbol()->getType() == tokenType;
}

bool PsiUtils::isFlatNumber(PsiElement *psi) {
    if (instanceof<Literal *>(psi)) return false;
    auto v = dynamic_cast<Literal *>(psi);
    return v->value().type() == typeid(int) || v->value().type() == typeid(double) || v->value().type() == typeid(bool);
}

bool PsiUtils::isNumber(PsiElement *psi) {
    if (instanceof<Literal *>(psi)) return false;
    auto v = dynamic_cast<Literal *>(psi);
    return v->value().type() == typeid(int) || v->value().type() == typeid(double);
}

bool PsiUtils::isString(PsiElement *psi) {
    if (instanceof<Literal *>(psi)) return false;
    auto v = dynamic_cast<Literal *>(psi);
    return v->value().type() == typeid(std::string);
}

bool PsiUtils::isNull(PsiElement *psi) {
    if (instanceof<Literal *>(psi)) return false;
    auto v = dynamic_cast<Literal *>(psi);
    return v->value().type() == typeid(nullptr);
}




