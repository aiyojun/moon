#ifndef MOONCPP_LITERAL_H
#define MOONCPP_LITERAL_H

#include "TerminalExpression.h"
#include "PsiUtils.h"
#include <any>

class Literal : public TerminalExpression {
public:
    std::string toString() override {return any_cast<std::string>(_value);}

    static Literal* build(TerminalNode* term);

private:
    std::any _value;
};


#endif //MOONCPP_LITERAL_H
