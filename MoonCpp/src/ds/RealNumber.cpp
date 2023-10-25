#include "RealNumber.h"

#include <iostream>








std::vector<unsigned char> str2dec(const std::string& str) {
    std::vector<unsigned char> _r;
    for (const auto &c : str) {
        if (c >= 48 && c <= 57)
            _r.emplace_back(c - 48);
    }
    return _r;
}






std::vector<unsigned char> dec2bin(const std::vector<unsigned char>& dec) {
    std::vector<unsigned char> _r;



    return _r;
}






RealNumber::RealNumber(const std::string &text) {
    clear();
    size_t dot = text.find('.');
    std::string _largeNumber = text;
//    std::cout << "dot : "<< dot << "; npos : " << std::string::npos << std::endl;
    if (dot != std::string::npos && dot != text.length() - 1) {
        _largeNumber = text.substr(0, dot);
    }
    for (int i = (int) _largeNumber.length() - 1; i >= 0; i--) {
//        std::cout << "char : " << _largeNumber[i] << std::endl;
        _dec.emplace_back((unsigned char) _largeNumber[i] - 48);
    }
}

RealNumber& RealNumber::operator=(const RealNumber &r) {
    _dec = r._dec;
    return *this;
}

RealNumber RealNumber::operator+(RealNumber &r) {
    if (r._dec.empty()) return {_dec};
    if (_dec.empty()) return {r._dec};
    bool carry = false; unsigned char x;
    RealNumber _r;
    size_t min = std::min(_dec.size(), r._dec.size());
    size_t max = std::max(_dec.size(), r._dec.size());
    for (int i = 0; i < min; i++) {
        x = _dec[i] + r._dec[i] + (carry ? 1 : 0);
        carry = x >= 10;
        if (x >= 20)
            std::cout << "!!!!" << x << std::endl;
        _r._dec.emplace_back(carry ? x - 10 : x);
    }
    for (int i = (int) min; i < max; i++) {
        x = _dec[i] + r._dec[i] + (carry ? 1 : 0);
        carry = x >= 10;
        if (x >= 20)
            std::cout << "!!!!" << x << std::endl;
        _r._dec.emplace_back(carry ? x - 10 : x);
    }
    if (carry)
        _r._dec.emplace_back(1);
    return _r;
}

void borrow(std::vector<unsigned char> &dec, size_t p) {
    size_t i = p;
    while (i < dec.size()) {
        if (dec[i]) {
            dec[i] = dec[i] - 1;
            return;
        }
        i++;
    }
}

RealNumber RealNumber::operator-(RealNumber &r) {
    if (r._dec.empty()) return {_dec};
    if (_dec.empty()) return {r._dec};
    std::vector<unsigned char> _big, _small;
    RealNumber _r;
    if (compare(r)) {
        _big = _dec;
        _small = r._dec;
    } else {
        _big = r._dec;
        _small = r._dec;
    }
    for (int i = 0; i < _small.size(); i++) {
        if (_big[i] < _small[i]) {
            borrow(_big, i + 1);
            _r._dec.emplace_back(10 + _big[i] - _small[i]);
        } else {
            _r._dec.emplace_back(_big[i] - _small[i]);
        }
    }
    for (int i = (int) _small.size(); i < _big.size(); i++) {
        _r._dec.emplace_back(_big[i]);
    }
    return _r;
}

std::vector<unsigned char> x_mul(const std::vector<unsigned char>& r0, unsigned char r1, unsigned char n) {
    std::vector<unsigned char> _r;
    for (size_t i = 0; i < n; i++) {
        _r.emplace_back(0);
    }
    unsigned char x, carry = 0;
    for (size_t i = 0; i < r0.size(); i++) {
        x = (unsigned char) r0[i] * r1 + carry;
        _r.emplace_back(x % 10);
        carry = x / 10;
    }
    if (carry)
        _r.emplace_back(carry);
    return _r;
}

RealNumber RealNumber::operator*(RealNumber &r) {
    RealNumber _r, x;
    for (size_t i = 0; i < r._dec.size(); i++) {
        x._dec = x_mul(_dec, r._dec[i], i);
//        std::cout << i << " " << std::to_string(r._dec[i]) << " " << x << std::endl;
        std::cout << i << " " << _r << " + " << x << std::endl;
        _r = _r + x;
    }
    return _r;
}

RealNumber RealNumber::div(RealNumber &r) {
    return RealNumber();
}

RealNumber RealNumber::mod(RealNumber &r) {
    return RealNumber();
}

RealNumber RealNumber::pow(int n) {
    return RealNumber();
}

int RealNumber::compare(RealNumber &r) {
    if (_dec.size() != r._dec.size())
        return _dec.size() > r._dec.size();
    if (_dec.empty()) return 0;
    for (int i = (int) _dec.size() - 1; i >= 0; i--) {
        if (_dec[i] > r._dec[i])
            return 1;
    }
    return -1;
}

std::string to_string(const RealNumber &r) {
    if (r._dec.empty()) return "0";
    std::string _r;
    for (int i = (int) r._dec.size() - 1; i >= 0; i--) {
        _r += (char) (r._dec[i] + 48);
    }
    return _r;
}

std::ostream &operator<<(std::ostream &out, const RealNumber &r) {
    out << to_string(r);
    return out;
}

void RealNumber::clear() {
    _dec.clear();
}

RealNumber::RealNumber(const std::vector<unsigned char> &n) {
    _dec = n;
}

RealNumber::RealNumber(const RealNumber &r) {
    _dec = r._dec;
}


