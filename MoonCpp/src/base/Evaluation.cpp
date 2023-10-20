#include "Evaluation.h"
#include "types.h"
#include "values.h"
#include "SyntaxError.h"
#include "debug/Debugger.h"

std::vector<IValue *> splice(std::vector<IValue *>& vec, int length) {
    if (vec.empty())
        throw SyntaxError("splice empty vector");
    std::vector<IValue *> _r;
    int size = (int) vec.size();
    for (int i = size - length; i < length; i++) {
        _r.emplace_back(vec[size - 1 - i]);
        vec.pop_back();
    }
    std::reverse(_r.begin(), _r.end());
    return _r;
}

Evaluation::Evaluation(SymbolProvider *scope, VirtualMachine *vm)
    : _scope(scope), _vm(vm) {

}

IValue *Evaluation::evaluate(Expression *exp) {
//    Debug() << "evaluate scope : " << _scope->toString() << Debugger::_end;
//    Debug() << "evaluate " << exp << Debugger::_end;
    std::cout << "evaluate " << exp->toString() << std::endl;
    std::cout << "evaluate scope : " << _scope->toString() << std::endl;
    _valueStack.clear();
    _checkpoints.clear();
    walk(exp);
//    Debug() << "evaluate " << exp << " => " << _valueStack.back() << Debugger::_end;
    return !_valueStack.empty() ? _valueStack.back() : nullptr;
}

bool Evaluation::onBefore(PsiElement *e) {
    if (_checkpoints.find(e) != _checkpoints.end()) {
        std::cout << "checkpoint " << e << std::endl;
        return true;
    }
    _checkpoints.insert(e);
    std::cout << "onBefore " << (e ? e->toString() : "null") << std::endl;
    if (instanceof<AssignmentExpression *>(e) && instanceof<Identifier *>(as<AssignmentExpression *>(e)->getLeft())) {
        auto left = as<Identifier *>(as<AssignmentExpression *>(e)->getLeft());
        if (!_scope->contains(left->getName())) {
            _scope->scan(Symbol::build(left->getName(), ValueSystem::buildNull()));
        }
    }
    if (instanceof<Literal *>(e)) {
        _valueStack.emplace_back(handleLiteral(as<Literal *>(e)));
        return true;
    }
    if (instanceof<Identifier *>(e)) {
        _valueStack.emplace_back(handleIdentifier(as<Identifier *>(e)));
        return true;
    }
    return false;
}

void Evaluation::onAfter(PsiElement *el) {
    std::cout << "onAfter " << (el ? el->toString() : "null") << std::endl;
    if (instanceof<DynamicMemberExpression *>(el)) {
        auto rr(splice(_valueStack, 2));
        _valueStack.emplace_back(handleDynamicMember(as<DynamicMemberExpression *>(el), rr[0], rr[1]));
        return;
    }
    if (instanceof<MemberExpression *>(el)) {
        auto rr(splice(_valueStack, 1));
        _valueStack.emplace_back(handleMember(as<MemberExpression *>(el), rr[0]));
        return;
    }
    if (instanceof<NewExpression *>(el)) {
        _valueStack.emplace_back(handleNew(as<NewExpression *>(el), {}));
        return;
    }
    if (instanceof<AssignmentExpression *>(el)) {
        auto rr(splice(_valueStack, 2));
        _valueStack.emplace_back(handleAssign(as<AssignmentExpression *>(el), rr[0], rr[1]));
        return;
    }
    if (instanceof<UnaryExpression *>(el)) {
        _valueStack.emplace_back(handleUnary(as<UnaryExpression *>(el), {}));
        return;
    }
    if (instanceof<BinaryExpression *>(el)) {
        auto rr(splice(_valueStack, 2));
        _valueStack.emplace_back(handleBinary(as<BinaryExpression *>(el), rr[0], rr[1]));
        return;
    }
    if (instanceof<CallExpression *>(el)) {
        std::cout << "call : " << el->toString() << "_value stack size : " << _valueStack.size() << std::endl;
        auto callee = splice(_valueStack, 1)[0];
        auto args(splice(_valueStack, (int) as<CallExpression *>(el)->getArguments().size()));
        _valueStack.emplace_back(handleCall(as<CallExpression *>(el), callee, args));
        return;
    }
}

IValue *Evaluation::handleLiteral(Literal *exp) {
    if (exp->isInteger()) return ValueSystem::buildNumber(exp->getInteger());
    if (exp->isFloat()) return ValueSystem::buildNumber(exp->getFloat());
    if (exp->isBoolean()) return ValueSystem::buildBoolean(exp->getBoolean());
    if (exp->isString()) return ValueSystem::buildString(exp->getString());
    return ValueSystem::buildNull();
}

IValue *Evaluation::handleIdentifier(Identifier *exp) {
    if (!_scope->contains(exp->getName()))
        throw SyntaxError("error: no such identifier : " + exp->getName());
    return _scope->get(exp->getName())->get();
}

IValue *Evaluation::handleAssign(AssignmentExpression *exp, IValue *target, IValue *value) {
    if (instanceof<Identifier *>(exp->getLeft())) {
        auto identifier = as<Identifier *>(exp->getLeft());
        auto symbol = _scope->get(identifier->getName());
        symbol->setValue(value);
        _scope->scan(symbol);
        return value;
    }
    if (!target->hasRef())
        throw SyntaxError("error: " + exp->getLeft()->toString() + " not assignable");
    target->getRef()->setValue(value);
    return value;
}

IValue *Evaluation::handleCall(CallExpression *exp, IValue *callee, std::vector<IValue *> args) {
    if (!instanceof<CallableValue *>(callee))
        throw SyntaxError("error: " + callee->toString() + " not callable");
    auto rr = as<CallableValue *>(callee);
    rr->setScope(_scope);
    rr->setVM(_vm);
    return rr->invoke(std::move(args));
}

IValue *Evaluation::handleDynamicMember(DynamicMemberExpression *exp, IValue *obj, IValue *property) {
    if (!instanceof<ObjectValue *>(obj))
        throw SyntaxError("error: invalid member access : " + property->toString());
    auto obj1 = as<ObjectValue *>(obj);
    if (obj1->isNull())
        throw SyntaxError("error: null exception member access : " + property->toString());
    if (instanceof<NumberValue *>(property) && as<NumberValue *>(property)->isInteger() && instanceof<ArrayValue *>(obj)) {
        auto mark = as<NumberValue *>(property)->getInteger();
        auto arr = as<ArrayValue *>(obj);
        auto _r = arr->getItem(mark);
        _r->setRef(jlib::Ref::refArray(arr, mark));
        return _r;
    }
    if (instanceof<StringValue *>(property) && instanceof<ObjectValue *>(obj)) {
        auto rObj = as<ObjectValue *>(obj);
        auto key = as<StringValue *>(property)->getValue();
        if (!rObj->contains(key))
            throw SyntaxError("error: no such property : " + key);
        auto _r = rObj->getProperty(key);
        _r->setRef(jlib::Ref::refObject(rObj, key));
        return _r;
    }
    throw SyntaxError("error: invalid member access : " + property->toString());
}

IValue *Evaluation::handleMember(MemberExpression *exp, IValue *obj) {
    if (!instanceof<Identifier *>(exp->getProperty()))
        throw SyntaxError("error: invalid member access");
    auto property = as<Identifier *>(exp->getProperty());
    if (!instanceof<ObjectValue *>(obj))
        throw SyntaxError("error: invalid member access : " + property->getName());
    auto rObj = as<ObjectValue *>(obj);
    if (rObj->isNull())
        throw SyntaxError("error: null exception when access : " + property->getName());
    if (!rObj->contains(property->getName()))
        throw SyntaxError("error: no such property : " + property->getName());
    auto _r = rObj->getProperty(property->getName());
    _r->setRef(jlib::Ref::refObject(rObj, property->getName()));
    return _r;
}

IValue *Evaluation::handleNew(NewExpression *exp, std::vector<IValue *> args) {
    auto clazz = exp->getCallee();
    auto symbol = _scope->get(clazz->getName());
    if (!symbol)
        throw SyntaxError("error: no such class : " + clazz->getName());
    if (!instanceof<DeclarativeClassValue *>(symbol->get()))
        throw SyntaxError("error: " + clazz->getName() + " not class type");
    return ValueSystem::buildDeclarativeObject(as<DeclarativeClassValue *>(symbol->get()));
}

IValue *Evaluation::handleUnary(UnaryExpression *exp, IValue *arg) {
    auto op = exp->getOperator();
    if (op == "!" && instanceof<NumberValue *>(arg))
        return ValueSystem::buildBoolean(! as<NumberValue *>(arg)->isTrue());
    if (op == "!" && instanceof<BooleanValue *>(arg))
        return ValueSystem::buildBoolean(! as<BooleanValue *>(arg)->getValue());
    if (op == "!" && instanceof<ObjectValue *>(arg))
        return ValueSystem::buildBoolean(as<ObjectValue *>(arg)->isNull());
    if (op == "~" && instanceof<NumberValue *>(arg) && as<NumberValue *>(arg)->isInteger())
        return ValueSystem::buildNumber(~ as<NumberValue *>(arg)->getInteger());
    if (op == "+" && instanceof<NumberValue *>(arg)) return arg;
    if (op == "-" && instanceof<NumberValue *>(arg)) {
        auto rr = as<NumberValue *>(arg);
        return rr->isInteger() ? ValueSystem::buildNumber(rr->getInteger()) : ValueSystem::buildNumber(rr->getFloat());
    }
    throw SyntaxError("error: invalid unary operation : " + op + ", argument : " + arg->toString());
}

bool isInteger(NumberValue *lv, NumberValue *rv) { return lv->isInteger() && rv->isInteger(); }

IValue *Evaluation::handleBinary(BinaryExpression *exp, IValue *left, IValue *right) {
    auto op = exp->getOperator();
    if (op == "+" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildNumber(lv->getInteger() + rv->getInteger())
                                 : ValueSystem::buildNumber(lv->getAsDouble() + rv->getAsDouble());
    }
    if (op == "+" && (instanceof<StringValue *>(left) || instanceof<StringValue *>(right)))
        return ValueSystem::buildString(left->toString() + right->toString());
    if (op == "-" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildNumber(lv->getInteger() - rv->getInteger())
                                 : ValueSystem::buildNumber(lv->getAsDouble() - rv->getAsDouble());
    }
    if (op == "*" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildNumber(lv->getInteger() * rv->getInteger())
                                 : ValueSystem::buildNumber(lv->getAsDouble() * rv->getAsDouble());
    }
    if (op == "/" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildNumber(lv->getInteger() / rv->getInteger())
                                 : ValueSystem::buildNumber(lv->getAsDouble() / rv->getAsDouble());
    }
    if (op == "%" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)
            && as<NumberValue *>(left)->isInteger() && as<NumberValue *>(right)->isInteger()) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return ValueSystem::buildNumber(lv->getInteger() % rv->getInteger());
    }
    if (op == "^" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)
        && as<NumberValue *>(left)->isInteger() && as<NumberValue *>(right)->isInteger()) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return ValueSystem::buildNumber(lv->getInteger() ^ rv->getInteger());
    }
    if (op == "|" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)
        && as<NumberValue *>(left)->isInteger() && as<NumberValue *>(right)->isInteger()) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return ValueSystem::buildNumber(lv->getInteger() | rv->getInteger());
    }
    if (op == "&" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)
        && as<NumberValue *>(left)->isInteger() && as<NumberValue *>(right)->isInteger()) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return ValueSystem::buildNumber(lv->getInteger() & rv->getInteger());
    }


    if (op == ">" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() > rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() > rv->getAsDouble());
    }
    if (op == ">=" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() >= rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() >= rv->getAsDouble());
    }
    if (op == "<" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() < rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() < rv->getAsDouble());
    }
    if (op == "<=" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() <= rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() <= rv->getAsDouble());
    }
    if (op == "==" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() == rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() == rv->getAsDouble());
    }
    if (op == "!=" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = as<NumberValue *>(left); auto rv = as<NumberValue *>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() != rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() != rv->getAsDouble());
    }

    if (op == ">" && instanceof<StringValue *>(left) && instanceof<StringValue *>(right))
        return ValueSystem::buildBoolean(left->toString() > right->toString());
    if (op == ">=" && instanceof<StringValue *>(left) && instanceof<StringValue *>(right))
        return ValueSystem::buildBoolean(left->toString() >= right->toString());
    if (op == "<" && instanceof<StringValue *>(left) && instanceof<StringValue *>(right))
        return ValueSystem::buildBoolean(left->toString() < right->toString());
    if (op == "<=" && instanceof<StringValue *>(left) && instanceof<StringValue *>(right))
        return ValueSystem::buildBoolean(left->toString() <= right->toString());
    if (op == "==" && instanceof<StringValue *>(left) && instanceof<StringValue *>(right))
        return ValueSystem::buildBoolean(left->toString() == right->toString());
    if (op == "!=" && instanceof<StringValue *>(left) && instanceof<StringValue *>(right))
        return ValueSystem::buildBoolean(left->toString() != right->toString());

    if (op == ">" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(as<BooleanValue *>(left)->getValue() > as<BooleanValue *>(right)->getValue());
    if (op == ">=" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(as<BooleanValue *>(left)->getValue() >= as<BooleanValue *>(right)->getValue());
    if (op == "<" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(as<BooleanValue *>(left)->getValue() < as<BooleanValue *>(right)->getValue());
    if (op == "<=" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(as<BooleanValue *>(left)->getValue() <= as<BooleanValue *>(right)->getValue());
    if (op == "==" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(as<BooleanValue *>(left)->getValue() == as<BooleanValue *>(right)->getValue());
    if (op == "!=" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(as<BooleanValue *>(left)->getValue() != as<BooleanValue *>(right)->getValue());

    if (op == "==" && instanceof<ObjectValue *>(left) && instanceof<ObjectValue *>(right))
        return ValueSystem::buildBoolean(left == right);
    if (op == "!=" && instanceof<ObjectValue *>(left) && instanceof<ObjectValue *>(right))
        return ValueSystem::buildBoolean(left != right);

    throw SyntaxError("error: invalid unary operation : " + op + ", left : " + left->toString() + ", right : " + right->toString());
}
