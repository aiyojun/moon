#include "Literal.h"
#include "MoonLexer.h"
#include "SyntaxError.h"

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
    auto text = term->getText();
    if (term->getSymbol()->getType() == MoonLexer::NUMBER) {
        if (text.find('.') != std::string::npos) {
            literal->setValue(std::stoi(term->getText()));
        } else {
            literal->setValue(std::stod(text));
        }
    } else if (term->getSymbol()->getType() == MoonLexer::HEX) {
        literal->setValue(std::stoi(term->getText(), nullptr, 16));
    } else if (term->getSymbol()->getType() == MoonLexer::OCT) {
        literal->setValue(std::stoi(term->getText(), nullptr, 8));
    } else if (term->getSymbol()->getType() == MoonLexer::BIN) {
        literal->setValue(std::stoi(term->getText(), nullptr, 2));
    } else if (term->getSymbol()->getType() == MoonLexer::STRING) {
        literal->setValue(stdStr(text));
    } else if (term->getText() == "true") {
        literal->setValue(true);
    } else if (term->getText() == "false") {
        literal->setValue(false);
    } else if (term->getText() == "null") {
        literal->setValueNull();
    } else {
        return nullptr;
    }
    return literal;
}

std::string Literal::toString() {
    std::string stream;
    switch (_valueType) {
        case V_BOOL:
            stream = _storage.vb ? "true" : "false";
            break;
        case V_INT:
            stream = std::to_string(_storage.vi);
            break;
        case V_FLOAT:
            stream = std::to_string(_storage.vf);
            break;
        case V_STRING:
            stream = _strValue;
            break;
        case V_NULL:
            stream = "null";
            break;
        default:
            stream = "undefined";
    }
    return stream;
}

void Literal::setValue(int v) {
    _valueType = V_INT;
    _storage.vi = v;
}

void Literal::setValue(double v) {
    _valueType = V_FLOAT;
    _storage.vf = v;
}

void Literal::setValue(bool v) {
    _valueType = V_BOOL;
    _storage.vb = v;
}

void Literal::setValue(std::string v) {
    _valueType = V_STRING;
    _strValue = std::move(v);
}

double Literal::getNumber() {
    switch (_valueType) {
        case V_INT:
            return (double) _storage.vi;
        case V_FLOAT:
            return _storage.vf;
        default:
            throw SyntaxError("Literal is not an number!");
    }
}

bool Literal::getAsBoolean() {
    bool _r = false;
    switch (_valueType) {
        case V_BOOL:
            _r = _storage.vb;
            break;
        case V_INT:
            _r = (bool) _storage.vi;
            break;
        case V_FLOAT:
            _r = (bool) _storage.vf;
            break;
        case V_STRING:
            _r = true;
            break;
        case V_NULL:
            _r = false;
            break;
        default:
            _r = false;
    }
    return _r;
}

int Literal::getAsInteger() {
    int _r = 0;
    switch (_valueType) {
        case V_BOOL:
            _r = (int) _storage.vb;
            break;
        case V_INT:
            _r = _storage.vi;
            break;
        case V_FLOAT:
            _r = (int) _storage.vf;
            break;
        default:;
    }
    return _r;
}

double Literal::getAsNumber() {
    double _r = 0;
    switch (_valueType) {
        case V_BOOL:
            _r = (double) ((int) _storage.vb);
            break;
        case V_INT:
            _r = (double) _storage.vi;
            break;
        case V_FLOAT:
            _r = _storage.vf;
            break;
        default:;
    }
    return _r;
}

Literal *Literal::build(std::string v) {
    auto _r = new Literal;
    _r->setValue(std::move(v));
    return _r;
}

Literal *Literal::build(int v) {
    auto _r = new Literal;
    _r->setValue(v);
    return _r;
}

Literal *Literal::build(double v) {
    auto _r = new Literal;
    _r->setValue(v);
    return _r;
}

Literal *Literal::build(bool v) {
    auto _r = new Literal;
    _r->setValue(v);
    return _r;
}

Literal *Literal::buildNull() {
    auto _r = new Literal;
    _r->setValueNull();
    return _r;
}




