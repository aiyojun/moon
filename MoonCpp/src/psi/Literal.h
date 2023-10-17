#ifndef MOONCPP_LITERAL_H
#define MOONCPP_LITERAL_H

#include "TerminalExpression.h"
#include "PsiUtils.h"

class Literal : public TerminalExpression {
public:
    enum ValueType {V_BOOL, V_INT, V_FLOAT, V_STRING, V_NULL};

    union Storage { int vi; double vf; bool vb; };

    std::string toString() override;

    static Literal *build(TerminalNode *term);

    bool isString() { return _valueType == V_STRING; }

    bool isNumber() { return _valueType == V_INT || _valueType == V_FLOAT; }

    bool isInteger() { return _valueType == V_INT; }

    bool isFloat() { return _valueType == V_FLOAT; }

    bool isBoolean() { return _valueType == V_BOOL; }

    bool isNumeric() { return isNumber() || isBoolean(); }

    int getInteger() { return _storage.vi; }

    double getFloat() { return _storage.vf; }

    bool getBoolean() { return _storage.vb; }

    bool isNull() { return _valueType == V_NULL; }

    double getNumber();

    bool getAsBoolean();

    int getAsInteger();

    double getAsNumber();

    std::string getString() { return _strValue; }

    void setValue(int v);

    void setValue(double v);

    void setValue(bool v);

    void setValue(std::string v);

    void setValueNull() { _valueType = V_NULL; }

    static Literal *build(std::string v);

    static Literal *build(int v);

    static Literal *build(double v);

    static Literal *build(bool v);

    static Literal *buildNull();

private:
    Storage _storage;

    std::string _strValue;

    ValueType _valueType;
};


#endif //MOONCPP_LITERAL_H
