#include "RealNumber.h"

#include <iostream>

namespace {

    using HexadecimalSequence = std::vector<int>;

    using DecimalSequence = std::vector<unsigned char>;

    DecimalSequence ln_int2dec_seq(int n) {
        DecimalSequence _r;
        int y = n;
        while (true) {
            _r.emplace_back((unsigned char) y % 10);
            y = y / 10;
            if (!y)
                break;
        }
        return _r;
    }

    int ln_cast2int(const DecimalSequence &vec) {
        if (vec.empty()) return 0;
        int _r = (int) vec[0];
        for (size_t i = 1; i < vec.size(); i++) {
            _r += (int) (vec[i] * 10 * i);
        }
        return _r;
    }

    std::string to_string(const DecimalSequence &vec) {
        std::string _r;
        for (int i = 0; i < vec.size(); i++) {
            _r += std::to_string((int) vec[i]);
        }
        return _r;
    }

    void amend_zero(DecimalSequence& num) {
        int len = (int) num.size();
        for (int i = len - 1; i >= 0; i--) {
            if (num[i] == 0) {
                num.pop_back();
            } else {
                break;
            }
        }
    }

    void subtract_borrow(DecimalSequence &dec, size_t p) {
        size_t i = p;
        while (i < dec.size()) {
            if (dec[i]) {
                dec[i] = dec[i] - 1;
                return;
            }
            dec[i] = 9;
            i++;
        }
    }

    int ln_compare(const DecimalSequence& num1, const DecimalSequence& num2) {
        if (num1.size() != num2.size())
            return num1.size() > num2.size() ? 1 : -1;
        if (num1.empty()) return 0;
        int i;
        for (i = (int) num1.size() - 1; i >= 0; i--) {
            if ((int) num1[i] == (int) num2[i]) continue;
            return (int) num1[i] > (int) num2[i] ? 1 : -1;
        }
        return i == -1 ? 0 : -1;
    }

    DecimalSequence ln_plus(const DecimalSequence& num1, const DecimalSequence& num2) {
        if (num2.empty()) return {num1};
        if (num1.empty()) return {num2};
        unsigned char x;
        bool carry = false;
        DecimalSequence _r;
        const DecimalSequence *p0, *p1;
        if (num1.size() < num2.size()) {
            p0 = &num1;
            p1 = &num2;
        } else {
            p0 = &num2;
            p1 = &num1;
        }
        for (int i = 0; i < (*p0).size(); i++) {
            x = (*p0)[i] + (*p1)[i] + (carry ? 1 : 0);
            carry = x >= 10;
            _r.emplace_back(carry ? (x - 10) : x);
        }
        for (int i = (int) (*p0).size(); i < (*p1).size(); i++) {
            x = (*p1)[i] + (carry ? 1 : 0);
            carry = x >= 10;
            _r.emplace_back(carry ? (x - 10) : x);
        }
        if (carry)
            _r.emplace_back(1);
        return _r;
    }

    DecimalSequence ln_minus(const DecimalSequence& num1, const DecimalSequence& num2) {
        if (num2.empty()) return {num1};
        if (num1.empty()) return {num2};
        DecimalSequence _big, _small, _ret;
        if (ln_compare(num1, num2) > 0) {
            _big = num1;
            _small = num2;
        } else if (ln_compare(num1, num2) < 0) {
            _big = num2;
            _small = num1;
        } else {
            return {};
        }
        for (int i = 0; i < _small.size(); i++) {
            if ((int) _big[i] < (int) _small[i]) {
                subtract_borrow(_big, i + 1);
                _ret.emplace_back(10 + _big[i] - _small[i]);
            } else {
                _ret.emplace_back(_big[i] - _small[i]);
            }
        }
        for (int i = (int) _small.size(); i < _big.size(); i++) {
            _ret.emplace_back(_big[i]);
        }
        amend_zero(_ret);
        return _ret;
    }

    DecimalSequence carry_multiply(const DecimalSequence &r0, unsigned char r1, unsigned char n) {
        DecimalSequence _r;
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

    bool zero_dec_seq(const DecimalSequence& num) {
        DecimalSequence r(num);
        amend_zero(r);
        return r.empty();
    }

    DecimalSequence ln_mul(const DecimalSequence& num1, const DecimalSequence& num2) {
        if (zero_dec_seq(num1) || zero_dec_seq(num2)) return {};
        DecimalSequence _r, _x;
        for (size_t i = 0; i < num2.size(); i++) {
            _x = carry_multiply(num1, num2[i], i);
            _r = ln_plus(_r, _x);
        }
        return _r;
    }

    DecimalSequence x_slice(const DecimalSequence &vec, size_t n) {
        DecimalSequence _r;
        int len = (int) vec.size();
        for (int i = (int) n - 1; i >= 0; i--) {
            _r.emplace_back(vec[len - i - 1]);
        }
        return _r;
    }

    void ln_div(const DecimalSequence &num1, const DecimalSequence &dividend,
                DecimalSequence &quotients, DecimalSequence &remainder) {
        if (ln_compare(num1, dividend) < 0) {
            quotients.clear();
            remainder = num1;
            return;
        }
        int _p = (int) (num1.size() - dividend.size() - 1);
        DecimalSequence divisor(x_slice(num1, dividend.size()));
        if (ln_compare(dividend, divisor) > 0) {
            _p -= 1;
            divisor = x_slice(num1, dividend.size() + 1);
        }
        int i = 0;
        for (;;) {
            amend_zero(divisor);
            for (i = 0; i < 10; i++) {
                DecimalSequence x = ln_mul(dividend, DecimalSequence{(unsigned char ) i});
                DecimalSequence y = ln_mul(dividend, DecimalSequence{(unsigned char ) (i + 1)});
                if (ln_compare(divisor, x) >= 0 && ln_compare(divisor, y) < 0) {
                    quotients.emplace_back(i);
                    remainder = ln_minus(divisor, x);
                    amend_zero(remainder);
                    break;
                }
            }
            divisor = remainder;
            if (_p < 0) { break; }
            for (i = _p; i >= 0; i--) {
                divisor = ln_plus(ln_mul(divisor, ln_int2dec_seq(10)), {num1[i]});
                if (ln_compare(divisor, dividend) < 0) {
                    quotients.emplace_back(0);
                } else {
                    _p = i - 1;
                    break;
                }
            }
            if (i == -1) {
                remainder = divisor;
                break;
            }
        }
        std::reverse(quotients.begin(), quotients.end());
        amend_zero(quotients);
        amend_zero(remainder);
    }

    DecimalSequence hex2dec(const HexadecimalSequence &hex) {
        DecimalSequence _r;
        RealNumber rn;
        for (int i = (int) hex.size() - 1; i >= 0; i--) {
            _r = ln_plus(ln_mul(_r, ln_int2dec_seq(16)), ln_int2dec_seq(hex[i]));
        }
        return _r;
    }

    HexadecimalSequence ln_band(const HexadecimalSequence &num1, const HexadecimalSequence& num2) {
        HexadecimalSequence _r;
        const HexadecimalSequence *p0, *p1;
        if (num1.size() < num2.size()) {
            p0 = &num1; p1 = &num2;
        } else {
            p0 = &num2; p1 = &num1;
        }
        for (int i = 0; i < (*p0).size(); i++) {
            _r.emplace_back((*p0)[i] & (*p1)[i]);
        }
        return _r;
    }

    HexadecimalSequence ln_bor(const HexadecimalSequence &num1, const HexadecimalSequence& num2) {
        HexadecimalSequence _r;
        const HexadecimalSequence *p0, *p1;
        if (num1.size() < num2.size()) {
            p0 = &num1; p1 = &num2;
        } else {
            p0 = &num2; p1 = &num1;
        }
        for (int i = 0; i < (*p0).size(); i++) {
            _r.emplace_back((*p0)[i] | (*p1)[i]);
        }
        for (int i = (int) (*p0).size(); i < (*p1).size(); i++) {
            _r.emplace_back((*p1)[i]);
        }
        return _r;
    }

    HexadecimalSequence ln_bxor(const HexadecimalSequence &num1, const HexadecimalSequence& num2) {
        HexadecimalSequence _r;
        const HexadecimalSequence *p0, *p1;
        if (num1.size() < num2.size()) {
            p0 = &num1; p1 = &num2;
        } else {
            p0 = &num2; p1 = &num1;
        }
        for (int i = 0; i < (*p0).size(); i++) {
            _r.emplace_back((*p0)[i] ^ (*p1)[i]);
        }
        for (int i = (int) (*p0).size(); i < (*p1).size(); i++) {
            _r.emplace_back(0 ^ (*p1)[i]);
        }
        return _r;
    }

    HexadecimalSequence ln_binv(const HexadecimalSequence &num) {
        HexadecimalSequence _r;
        for (int i = 0; i < num.size(); i++) {
            _r.emplace_back(15 - num[i]);
        }
        return _r;
    }

}

RealNumber::RealNumber(int n) {
    if (n == 0) return;
    _dec = ln_int2dec_seq(n);
}

RealNumber::RealNumber(const std::vector<unsigned char> &n) {
    _dec = n;
}

RealNumber::RealNumber(const RealNumber &r) {
    _dec = r._dec;
}

RealNumber::RealNumber(const std::string &text) {
    clear();
    size_t dot = text.find('.');
    std::string _largeNumber = text;
    if (dot != std::string::npos) {
        _largeNumber = text.substr(0, dot);
    }
    for (int i = (int) _largeNumber.length() - 1; i >= 0; i--) {
        _dec.emplace_back((unsigned char) (_largeNumber[i] - 48));
    }
}

RealNumber &RealNumber::operator=(const RealNumber &r) {
    _dec = r._dec;
    return *this;
}

RealNumber RealNumber::operator+(const RealNumber &r) const {
    return ln_plus(_dec, r._dec);
}

RealNumber RealNumber::operator-(const RealNumber &r) const {
    return ln_minus(_dec, r._dec);
}

RealNumber RealNumber::operator*(const RealNumber &r) const {
    return ln_mul(_dec, r._dec);
}

void RealNumber::div(const RealNumber &dividend, RealNumber &quotients, RealNumber &remainder) const {
    ln_div(_dec, dividend._dec, quotients._dec, remainder._dec);
}

int RealNumber::compare(const RealNumber &r) const {
    return ln_compare(_dec, r._dec);
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

int RealNumber::cast_int() {
    return ln_cast2int(_dec);
}

RealNumber RealNumber::operator/(const RealNumber &r) const {
    RealNumber quotients, remainder;
    ln_div(_dec, r._dec, quotients._dec, remainder._dec);
    return quotients;
}

RealNumber RealNumber::operator%(const RealNumber &r) const {
    RealNumber quotients, remainder;
    ln_div(_dec, r._dec, quotients._dec, remainder._dec);
    return remainder;
}

void RealNumber::cache_hex() {
    auto dividend = RealNumber(16);
    RealNumber quotients, remainder;
    std::vector<int> _r;
    RealNumber y = *this;
    while (true) {
        quotients.clear(); remainder.clear();
        ln_div(y._dec, dividend._dec, quotients._dec, remainder._dec);
        _r.emplace_back(remainder.cast_int());
        y = quotients;
        if (!y.compare(0))
            break;
    }
    _hex = _r;
}

RealNumber RealNumber::operator|(RealNumber &r) {
    if (_hex.empty()) cache_hex();
    if (r._hex.empty()) r.cache_hex();
    RealNumber _r;
    _r._hex = ln_bor(_hex, r._hex);
    _r._dec = hex2dec(_r._hex);
    return _r;
}

RealNumber RealNumber::operator&(RealNumber &r) {
    if (_hex.empty()) cache_hex();
    if (r._hex.empty()) r.cache_hex();
    RealNumber _r;
    _r._hex = ln_band(_hex, r._hex);
    _r._dec = hex2dec(_r._hex);
    return _r;
}

RealNumber RealNumber::operator^(RealNumber &r) {
    if (_hex.empty()) cache_hex();
    if (r._hex.empty()) r.cache_hex();
    RealNumber _r;
    _r._hex = ln_bxor(_hex, r._hex);
    _r._dec = hex2dec(_r._hex);
    return _r;
}

RealNumber RealNumber::operator~() {
    if (_hex.empty()) cache_hex();
    RealNumber _r;
    _r._hex = ln_binv(_hex);
    _r._dec = hex2dec(_r._hex);
    return _r;
}

std::string RealNumber::to_hex() {
    if (_hex.empty()) cache_hex();
    std::string _rr("0x");
    for (int i = (int) _hex.size() - 1; i >= 0; i--) {
        if (_hex[i] >= 10) {
            _rr += (char) (_hex[i] - 10 + 65);
        } else {
            _rr += std::to_string(_hex[i]);
        }
    }
    return _rr;
}

