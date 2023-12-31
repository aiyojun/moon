#ifndef MOONCPP_REALNUMBER_H
#define MOONCPP_REALNUMBER_H

#include <string>
#include <vector>
#include <ostream>

class RealNumber {
public:
    RealNumber() = default;

    RealNumber(int n);

    RealNumber(const std::string &n);

    RealNumber(const RealNumber &r);

    RealNumber(const std::vector<unsigned char> &v);

    void clear();

    RealNumber& operator=(const RealNumber &r);

    RealNumber operator+(const RealNumber &r) const;

    RealNumber operator-(const RealNumber &r) const;

    RealNumber operator*(const RealNumber &r) const;

    RealNumber operator/(const RealNumber &r) const;

    RealNumber operator%(const RealNumber &r) const;

    RealNumber operator|(RealNumber &r);

    RealNumber operator&(RealNumber &r);

    RealNumber operator^(RealNumber &r);

    RealNumber operator~();

    void div(const RealNumber &dividend, RealNumber &quotients, RealNumber &remainder) const;

    int compare(const RealNumber &r) const;

    int cast_int();

    std::string to_hex();

private:
    void cache_hex();

    friend std::string to_string(const RealNumber &r);

    friend std::ostream &operator<<(std::ostream &out, const RealNumber &r);

private:
    std::vector<unsigned char> _dec;
    std::vector<int> _hex;
    bool _pre = true;
    int _dot = 0;
};

std::string to_string(const RealNumber &r);

std::ostream &operator<<(std::ostream &out, const RealNumber &r);

#endif //MOONCPP_REALNUMBER_H
