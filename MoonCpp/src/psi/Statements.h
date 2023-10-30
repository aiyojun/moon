#ifndef MOONCPP_STATEMENTS_H
#define MOONCPP_STATEMENTS_H

#include <vector>
#include "Statement.h"

class Statements : public Statement {
public:
    std::vector<Statement *> &getBody() { return _body; }

private:
    std::vector<Statement *> _body;
};

#endif //MOONCPP_STATEMENTS_H
