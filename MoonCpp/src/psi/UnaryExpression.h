#ifndef MOONCPP_UNARYEXPRESSION_H
#define MOONCPP_UNARYEXPRESSION_H


#include "Expression.h"

class UnaryExpression : public Expression {
public:
    void setPrefix(bool prefix) { _prefix = prefix; }

    void setOperator(const std::string &op) { _operator = op; }

    void setArgument(Expression *e);

    bool getPrefix() { return _prefix; }

    const std::string &getOperator() { return _operator; }

    Expression *getArgument() { return _argument; }

    std::string toString() override;

private:
    bool _prefix;

    std::string _operator;

    Expression *_argument;
};


#endif //MOONCPP_UNARYEXPRESSION_H
