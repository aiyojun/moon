#ifndef MOONCPP_IDENTIFIER_H
#define MOONCPP_IDENTIFIER_H

#include "Expression.h"

class Identifier : public Expression {
public:
    void setName(const std::string& name) {_name = name;}

    const std::string& getName() {return _name;}

    std::string toString() override {return _name;}

private:
    std::string _name;
};


#endif //MOONCPP_IDENTIFIER_H
