#ifndef MOONCPP_REALNUMBER_H
#define MOONCPP_REALNUMBER_H

#include <string>
#include <vector>
#include <ostream>

// + - * / % >> << | & ^ ~
class RealNumber {
public:
    RealNumber() = default;

//    RealNumber(int n);
//
//    RealNumber(long n);
//
//    RealNumber(float n);
//
//    RealNumber(double n);

    RealNumber(const std::vector<unsigned char> &n);

    RealNumber(const std::string &n);

    RealNumber(const RealNumber &r);

//    ~RealNumber();

    void clear();

    RealNumber& operator=(const RealNumber &r);

    RealNumber operator+(RealNumber &r);

    RealNumber operator-(RealNumber &r);

    RealNumber operator*(RealNumber &r);

    RealNumber div(RealNumber &r);

    RealNumber mod(RealNumber &r);

    int compare(RealNumber &r);

    RealNumber pow(int n);

    friend std::string to_string(const RealNumber &r);

    friend std::ostream &operator<<(std::ostream &out, const RealNumber &r);

private:
    std::vector<unsigned char> _dec;

//    std::vector<unsigned char> _bin;
};

std::string to_string(const RealNumber &r);

std::ostream &operator<<(std::ostream &out, const RealNumber &r);

#endif //MOONCPP_REALNUMBER_H
