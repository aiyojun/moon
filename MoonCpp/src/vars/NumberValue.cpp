#include "NumberValue.h"

NumberValue::NumberValue(int value) : _type(NumberValueType::INT) {
    _value._iv = value;
}

NumberValue::NumberValue(double value) : _type(NumberValueType::FLOAT) {
    _value._fv = value;
}

std::string NumberValue::toString() {
    if (_type == INT) return std::to_string(_value._iv);
    else return std::to_string(_value._fv);
}

int NumberValue::getAsInteger() {
    return _type == INT ? _value._iv : (int) _value._fv;
}

double NumberValue::getAsDouble() {
    return _type == INT ? (double) _value._iv : _value._fv;
}

bool NumberValue::isTrue() {
    return _type == INT ? (_value._iv == 0) : (_value._fv == 0);
}

bool NumberValue::isInteger() {
    return _type == INT;
}

int NumberValue::getInteger() {
    return _value._iv;
}

double NumberValue::getFloat() {
    return _value._fv;
}
