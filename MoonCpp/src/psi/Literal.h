#ifndef MOONCPP_LITERAL_H
#define MOONCPP_LITERAL_H

#include "Expression.h"

class Literal : public Expression {
public:
    std::string toString() override {return _value;}

private:
    std::string _value;
};


#endif //MOONCPP_LITERAL_H
