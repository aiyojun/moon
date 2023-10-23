#ifndef MOONCPP_IDENTIFIER_H
#define MOONCPP_IDENTIFIER_H

#include "TerminalExpression.h"

class Identifier : public TerminalExpression {
public:
    void setName(const std::string &name) { _name = name; }

    const std::string &getName() { return _name; }

    std::string toString() override { return _name; }

    static Identifier *build(const std::string &name);

    json toJson() override;

    nlohmann::json toJsonTree() override;

private:
    std::string _name;
};

#endif //MOONCPP_IDENTIFIER_H
