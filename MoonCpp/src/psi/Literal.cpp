#include "Literal.h"
#include "MoonLexer.h"

std::string replace_all(std::string str, const std::string& oldStr, const std::string& newStr) {
    size_t pos;
    while ((pos = str.find(oldStr)) != std::string::npos) {
        str.replace(pos, oldStr.length(), newStr);
    }
    return str;
}

std::string escape(const std::string& text) {
    std::string s(text);
    s = replace_all(s, "\\b", "\b");
    s = replace_all(s, "\\t", "\t");
    s = replace_all(s, "\\n", "\n");
    s = replace_all(s, "\\f", "\f");
    s = replace_all(s, "\\r", "\r");
    s = replace_all(s, "\\'", "\'");
    s = replace_all(s, "\\\"", "\"");
    return s;
}

std::string stdStr(const std::string& text) {
    if ((text[0] == '\'' && text[text.length() - 1] == '\'') || (text[0] == '"' && text[text.length() - 1] == '"'))
        return escape(text.substr(1, text.length() - 2));
    else if (text.substr(0, 2) == "r\"" && text[text.length() - 1] == '"')
        return text.substr(2, text.length() - 3);
    else
        return "";
}

Literal* Literal::build(TerminalNode* term) {
    auto literal = new Literal;
    literal->loc(term);
    if (term->getSymbol()->getType() == MoonLexer::NUMBER) {
        literal->_value = std::stod(term->getText());
    } else if (term->getSymbol()->getType() == MoonLexer::HEX) {
        literal->_value = std::stoi(term->getText(), nullptr, 16);
    } else if (term->getSymbol()->getType() == MoonLexer::OCT) {
        literal->_value = std::stoi(term->getText(), nullptr, 8);
    } else if (term->getSymbol()->getType() == MoonLexer::BIN) {
        literal->_value = std::stoi(term->getText(), nullptr, 2);
    } else if (term->getSymbol()->getType() == MoonLexer::STRING) {
        literal->_value = stdStr(term->getText());
    } else if (term->getText() == "true") {
        literal->_value = true;
    } else if (term->getText() == "false") {
        literal->_value = false;
    } else {
        return nullptr;
    }
    return literal;
}
