#ifndef MOONCPP_CONSOLE_H
#define MOONCPP_CONSOLE_H

#include <iostream>

class Console {
public:
    static Console* Get();

    void info(const std::string& message);

    void warn(const std::string& message);

    void error(const std::string& message);

private:
    static Console* _self;

    Console();
};


#endif //MOONCPP_CONSOLE_H
