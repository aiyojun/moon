#ifndef MOONCPP_REALNUMBER_H
#define MOONCPP_REALNUMBER_H

#include <string>

// + - * / % >> << | & ^ ~
class RealNumber {
public:
    RealNumber(int n);

    RealNumber(long n);

    RealNumber(float n);

    RealNumber(double n);

    RealNumber(const std::string &n);

    RealNumber(const RealNumber &r);

    ~RealNumber();

    RealNumber operator=(RealNumber &r);

    RealNumber operator+(RealNumber &r);

    RealNumber operator-(RealNumber &r);

    RealNumber mul(RealNumber &r);

    RealNumber div(RealNumber &r);

    RealNumber compare(RealNumber &r);

    RealNumber pow(int n);

    friend std::string to_string(const RealNumber &r);

    friend std::ostream &operator<<(std::ostream &out, const RealNumber &r);

private:

};

std::string to_string(const RealNumber &r);

std::ostream &operator<<(std::ostream &out, const RealNumber &r);

#endif //MOONCPP_REALNUMBER_H
