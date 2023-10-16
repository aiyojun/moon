#ifndef MOONCPP_MEMBEREXPRESSION_H
#define MOONCPP_MEMBEREXPRESSION_H

#include "Expression.h"

class MemberExpression : public Expression {
public:
    void setObject(Expression *e);

    void setProperty(Expression *e);

    Expression *getObject() { return _object; }

    Expression *getProperty() { return _property; }

private:
    Expression *_object = nullptr;

    Expression *_property = nullptr;
};


#endif //MOONCPP_MEMBEREXPRESSION_H
