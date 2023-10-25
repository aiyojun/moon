#include "Evaluation.h"
#include "types.h"
#include "values.h"
#include "SyntaxError.h"
#include "debug/Debugger.h"

std::vector<std::shared_ptr<IValue> > splice(std::vector<std::shared_ptr<IValue> >& vec, int length) {
    if (vec.empty())
        throw SyntaxError("splice empty vector");
    std::vector<std::shared_ptr<IValue> > _r;
    int size = (int) vec.size();
    for (int i = 0; i < length; i++) {
        _r.emplace_back(vec[size - 1 - i]);
        vec.pop_back();
    }
    std::reverse(_r.begin(), _r.end());
    return _r;
}

Evaluation::Evaluation(SymbolProvider *scope, VirtualMachine *vm)
    : _scope(scope), _vm(vm) {
}

std::shared_ptr<IValue> Evaluation::evaluate(Expression *exp) {
//    std::cout << "evaluate " << exp->toString() << std::endl;
//    if (!_scope) {
//        std::cout << "warning: without scope" << std::endl;
//    }
//    std::cout << "evaluate scope : \n" << _scope->toString() << std::endl;
    _vstack.clear();
    _checkpoints.clear();
    walk(exp);
    return !_vstack.empty() ? _vstack.back() : nullptr;
}

bool Evaluation::onBefore(PsiElement *e) {
    if (_checkpoints.find(e) != _checkpoints.end()) {
        std::cout << "checkpoint " << e << std::endl;
        return true;
    }
    _checkpoints.insert(e);
    if (instanceof<AssignmentExpression *>(e) && instanceof<Identifier *>(as<AssignmentExpression *>(e)->getLeft())) {
        auto left = as<Identifier *>(as<AssignmentExpression *>(e)->getLeft());
        if (!_scope->contains(left->getName())) {
            _scope->scan(Symbol::build(left->getName(), ValueSystem::buildNull()));
        }
    }
    if (instanceof<Literal *>(e)) {
        _vstack.emplace_back(handleLiteral(as<Literal *>(e)));
        return true;
    }
    if (instanceof<Identifier *>(e)) {
        _vstack.emplace_back(handleIdentifier(as<Identifier *>(e)));
        return true;
    }
    return false;
}

void Evaluation::onAfter(PsiElement *el) {
//    std::cout << "onAfter " << (el ? el->toString() : "null") << std::endl;
    if (instanceof<DynamicMemberExpression *>(el)) {
        auto rr(splice(_vstack, 2));
        _vstack.emplace_back(handleDynamicMember(as<DynamicMemberExpression *>(el), rr[0], rr[1]));
        return;
    }
    if (instanceof<MemberExpression *>(el)) {
        auto rr(splice(_vstack, 1));
        _vstack.emplace_back(handleMember(as<MemberExpression *>(el), rr[0]));
        return;
    }
    if (instanceof<NewExpression *>(el)) {
        _vstack.emplace_back(handleNew(as<NewExpression *>(el), {}));
        return;
    }
    if (instanceof<AssignmentExpression *>(el)) {
        auto rr(splice(_vstack, 2));
        _vstack.emplace_back(handleAssign(as<AssignmentExpression *>(el), rr[0], rr[1]));
        return;
    }
    if (instanceof<UnaryExpression *>(el)) {
        _vstack.emplace_back(handleUnary(as<UnaryExpression *>(el), {}));
        return;
    }
    if (instanceof<BinaryExpression *>(el)) {
        auto rr(splice(_vstack, 2));
        _vstack.emplace_back(handleBinary(as<BinaryExpression *>(el), rr[0], rr[1]));
        return;
    }
    if (instanceof<CallExpression *>(el)) {
        auto args(splice(_vstack, (int) as<CallExpression *>(el)->getArguments().size()));
        auto callee = splice(_vstack, 1)[0];
        _vstack.emplace_back(handleCall(as<CallExpression *>(el), callee, args));
        return;
    }
}

std::shared_ptr<IValue> Evaluation::handleLiteral(Literal *exp) {
    if (exp->isInteger()) return ValueSystem::buildNumber(exp->getInteger());
    if (exp->isFloat()) return ValueSystem::buildNumber(exp->getFloat());
    if (exp->isBoolean()) return ValueSystem::buildBoolean(exp->getBoolean());
    if (exp->isString()) return ValueSystem::buildString(exp->getString());
    return ValueSystem::buildNull();
}

std::shared_ptr<IValue> Evaluation::handleIdentifier(Identifier *exp) {
    if (!_scope->contains(exp->getName()))
        throw SyntaxError("error: no such identifier : " + exp->getName());
    return _scope->get(exp->getName())->get();
}

std::shared_ptr<IValue> Evaluation::handleAssign(AssignmentExpression *exp, const std::shared_ptr<IValue> &target, const std::shared_ptr<IValue> &value) {
    if (exp->getOperator().length() > 1)
        throw SyntaxError("error: no implementation");
    if (instanceof<Identifier *>(exp->getLeft())) {
//        if (exp->getOperator().length() == 1) {
//        }
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

std::shared_ptr<IValue> Evaluation::handleCall(CallExpression *exp, const std::shared_ptr<IValue> &callee, std::vector<std::shared_ptr<IValue> > args) {
    if (!instanceof<CallableValue *>(callee))
        throw SyntaxError("error: " + callee->toString() + " not callable");
    auto rr = downcast<CallableValue>(callee);
    rr->setScope(_scope);
    rr->setVM(_vm);
    return rr->invoke(std::move(args));
}

std::shared_ptr<IValue> Evaluation::handleDynamicMember(DynamicMemberExpression *exp, const std::shared_ptr<IValue> &obj, const std::shared_ptr<IValue> &property) {
    if (!instanceof<ObjectValue *>(obj))
        throw SyntaxError("error: invalid member access : " + property->toString());
    auto obj1 = downcast<ObjectValue>(obj);
    if (obj1->isNull())
        throw SyntaxError("error: null exception member access : " + property->toString());
    if (instanceof<NumberValue *>(property) && downcast<NumberValue>(property)->isInteger() && instanceof<ArrayValue *>(obj)) {
        auto mark = downcast<NumberValue>(property)->getInteger();
        auto arr = downcast<ArrayValue>(obj);
        auto _r = arr->getItem(mark);
        _r->setRef(jlib::Ref::refArray(arr, mark));
        return _r;
    }
    if (instanceof<StringValue *>(property) && instanceof<ObjectValue *>(obj)) {
        auto rObj = downcast<ObjectValue>(obj);
        auto key = downcast<StringValue>(property)->getValue();
        if (!rObj->contains(key))
            throw SyntaxError("error: no such property : " + key);
        auto _r = rObj->getProperty(key);
        _r->setRef(jlib::Ref::refObject(rObj, key));
        return _r;
    }
    throw SyntaxError("error: invalid member access : " + property->toString());
}

std::shared_ptr<IValue> Evaluation::handleMember(MemberExpression *exp, const std::shared_ptr<IValue> &obj) {
    if (!instanceof<Identifier *>(exp->getProperty()))
        throw SyntaxError("error: invalid member access");
    auto property = as<Identifier *>(exp->getProperty());
    if (!instanceof<ObjectValue *>(obj))
        throw SyntaxError("error: invalid member access : " + property->getName());
    auto rObj = downcast<ObjectValue>(obj);
    if (rObj->isNull())
        throw SyntaxError("error: null exception when access : " + property->getName());
    if (!rObj->contains(property->getName()))
        throw SyntaxError("error: no such property : " + property->getName());
    auto _r = rObj->getProperty(property->getName());
    _r->setRef(jlib::Ref::refObject(rObj, property->getName()));
    return _r;
}

std::shared_ptr<IValue> Evaluation::handleNew(NewExpression *exp, std::vector<std::shared_ptr<IValue> > args) {
    auto clazz = exp->getCallee();
    auto symbol = _scope->get(clazz->getName());
    if (!symbol)
        throw SyntaxError("error: no such class : " + clazz->getName());
    if (!instanceof<DeclarativeClassValue *>(symbol->get()))
        throw SyntaxError("error: " + clazz->getName() + " not class type");
    return ValueSystem::buildDeclarativeObject(downcast<DeclarativeClassValue>(symbol->get()));
}

std::shared_ptr<IValue> Evaluation::handleUnary(UnaryExpression *exp, const std::shared_ptr<IValue> &arg) {
    auto op = exp->getOperator();
    if (op == "!" && instanceof<NumberValue *>(arg))
        return ValueSystem::buildBoolean(! downcast<NumberValue>(arg)->isTrue());
    if (op == "!" && instanceof<BooleanValue *>(arg))
        return ValueSystem::buildBoolean(! downcast<BooleanValue>(arg)->getValue());
    if (op == "!" && instanceof<ObjectValue *>(arg))
        return ValueSystem::buildBoolean(downcast<ObjectValue>(arg)->isNull());
    if (op == "~" && instanceof<NumberValue *>(arg) && downcast<NumberValue>(arg)->isInteger())
        return ValueSystem::buildNumber(~ downcast<NumberValue>(arg)->getInteger());
    if (op == "+" && instanceof<NumberValue *>(arg)) return arg;
    if (op == "-" && instanceof<NumberValue *>(arg)) {
        auto rr = downcast<NumberValue>(arg);
        return rr->isInteger() ? ValueSystem::buildNumber(rr->getInteger()) : ValueSystem::buildNumber(rr->getFloat());
    }
    throw SyntaxError("error: invalid unary operation : " + op + ", argument : " + arg->toString());
}

bool isInteger(const std::shared_ptr<NumberValue> &lv, const std::shared_ptr<NumberValue> &rv) { return lv->isInteger() && rv->isInteger(); }

std::shared_ptr<IValue> Evaluation::handleBinary(BinaryExpression *exp, const std::shared_ptr<IValue> &left, const std::shared_ptr<IValue> &right) {
    auto op = exp->getOperator();
    if (op == "+" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildNumber(lv->getInteger() + rv->getInteger())
                                 : ValueSystem::buildNumber(lv->getAsDouble() + rv->getAsDouble());
    }
    if (op == "+" && (instanceof<StringValue *>(left) || instanceof<StringValue *>(right)))
        return ValueSystem::buildString(left->toString() + right->toString());
    if (op == "-" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildNumber(lv->getInteger() - rv->getInteger())
                                 : ValueSystem::buildNumber(lv->getAsDouble() - rv->getAsDouble());
    }
    if (op == "*" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildNumber(lv->getInteger() * rv->getInteger())
                                 : ValueSystem::buildNumber(lv->getAsDouble() * rv->getAsDouble());
    }
    if (op == "/" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildNumber(lv->getInteger() / rv->getInteger())
                                 : ValueSystem::buildNumber(lv->getAsDouble() / rv->getAsDouble());
    }
    if (op == "%" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)
            && downcast<NumberValue>(left)->isInteger() && downcast<NumberValue>(right)->isInteger()) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return ValueSystem::buildNumber(lv->getInteger() % rv->getInteger());
    }
    if (op == "^" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)
        && downcast<NumberValue>(left)->isInteger() && downcast<NumberValue>(right)->isInteger()) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return ValueSystem::buildNumber(lv->getInteger() ^ rv->getInteger());
    }
    if (op == "|" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)
        && downcast<NumberValue>(left)->isInteger() && downcast<NumberValue>(right)->isInteger()) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return ValueSystem::buildNumber(lv->getInteger() | rv->getInteger());
    }
    if (op == "&" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)
        && downcast<NumberValue>(left)->isInteger() && downcast<NumberValue>(right)->isInteger()) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return ValueSystem::buildNumber(lv->getInteger() & rv->getInteger());
    }


    if (op == ">" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() > rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() > rv->getAsDouble());
    }
    if (op == ">=" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() >= rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() >= rv->getAsDouble());
    }
    if (op == "<" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() < rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() < rv->getAsDouble());
    }
    if (op == "<=" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() <= rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() <= rv->getAsDouble());
    }
    if (op == "==" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
        return isInteger(lv, rv) ? ValueSystem::buildBoolean(lv->getInteger() == rv->getInteger())
                                 : ValueSystem::buildBoolean(lv->getAsDouble() == rv->getAsDouble());
    }
    if (op == "!=" && instanceof<NumberValue *>(left) && instanceof<NumberValue *>(right)) {
        auto lv = downcast<NumberValue>(left); auto rv = downcast<NumberValue>(right);
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
        return ValueSystem::buildBoolean(downcast<BooleanValue>(left)->getValue() > downcast<BooleanValue>(right)->getValue());
    if (op == ">=" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(downcast<BooleanValue>(left)->getValue() >= downcast<BooleanValue>(right)->getValue());
    if (op == "<" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(downcast<BooleanValue>(left)->getValue() < downcast<BooleanValue>(right)->getValue());
    if (op == "<=" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(downcast<BooleanValue>(left)->getValue() <= downcast<BooleanValue>(right)->getValue());
    if (op == "==" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(downcast<BooleanValue>(left)->getValue() == downcast<BooleanValue>(right)->getValue());
    if (op == "!=" && instanceof<BooleanValue *>(left) && instanceof<BooleanValue *>(right))
        return ValueSystem::buildBoolean(downcast<BooleanValue>(left)->getValue() != downcast<BooleanValue>(right)->getValue());

    if (op == "==" && instanceof<ObjectValue *>(left) && instanceof<ObjectValue *>(right))
        return ValueSystem::buildBoolean(left == right);
    if (op == "!=" && instanceof<ObjectValue *>(left) && instanceof<ObjectValue *>(right))
        return ValueSystem::buildBoolean(left != right);

    throw SyntaxError("error: invalid binary operation : " + op + ", left : " + left->toString() + ", right : " + right->toString());
}
