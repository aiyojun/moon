#ifndef MOONCPP_IFSTATEMENT_H
#define MOONCPP_IFSTATEMENT_H

#include "Statement.h"
#include "Expression.h"
#include "BlockStatement.h"

class IfStatement : public Statement {
public:
    void setTest(Expression* e);

    void setConsequent(BlockStatement* s);

    void setAlternate(Statement* s);

    Expression* getTest() {return _test;}

    BlockStatement* getConsequent() {return _consequent;}

    Statement* getAlternate() {return _alternate;}

private:
    Expression* _test;

    BlockStatement* _consequent;

    Statement* _alternate;
};


#endif //MOONCPP_IFSTATEMENT_H
