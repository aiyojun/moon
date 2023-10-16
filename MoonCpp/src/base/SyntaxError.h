#ifndef MOONCPP_SYNTAXERROR_H
#define MOONCPP_SYNTAXERROR_H

#include <exception>

class SyntaxError : public std::exception {
public:
    explicit SyntaxError(const std::string& msg): std::exception(msg.c_str()) {

    }
};


#endif //MOONCPP_SYNTAXERROR_H
