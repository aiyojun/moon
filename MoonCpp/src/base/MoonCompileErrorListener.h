#ifndef MOONCPP_MOONCOMPILEERRORLISTENER_H
#define MOONCPP_MOONCOMPILEERRORLISTENER_H

#include "PsiUtils.h"
#include "SyntaxError.h"

using namespace antlr4;

class MoonCompileErrorListener : public ANTLRErrorListener {
public:
    void syntaxError(antlr4::Recognizer *recognizer, antlr4::Token *offendingSymbol, size_t line, size_t column, const std::string &msg, std::exception_ptr e) override {
        throw SyntaxError(
            "program:"
                + std::to_string(line)
                + ":"
                + std::to_string(column)
                + ": error: "
                + msg
        );
    }

    void reportAmbiguity(antlr4::Parser *recognizer, const dfa::DFA &dfa, size_t startIndex, size_t stopIndex, bool exact, const antlrcpp::BitSet &ambigAlts, atn::ATNConfigSet *configs) override {}

    void reportAttemptingFullContext(antlr4::Parser *recognizer, const dfa::DFA &dfa, size_t startIndex, size_t stopIndex, const antlrcpp::BitSet &conflictingAlts, atn::ATNConfigSet *configs) override {}

    void reportContextSensitivity(antlr4::Parser *recognizer, const dfa::DFA &dfa, size_t startIndex, size_t stopIndex, size_t prediction, atn::ATNConfigSet *configs) override {}
};


#endif //MOONCPP_MOONCOMPILEERRORLISTENER_H
