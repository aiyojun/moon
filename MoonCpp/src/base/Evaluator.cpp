#include "types.h"
#include "Evaluator.h"
#include "CallExpression.h"
#include "Identifier.h"
#include "SyntaxError.h"
#include "FunctionDeclaration.h"
#include "VirtualMachine.h"
#include "MemberExpression.h"
#include "BuiltinProvider.h"

bool Evaluator::onBefore(PsiElement *e) {
    if (instanceof<CallExpression *>(e)) {
        _stack.emplace_back(handleCallExpression(as<CallExpression *>(e)));
        return true;
    }
    if (instanceof<ReturnStatement *>(e)) {
        auto ev = as<ReturnStatement *>(e);
        if (!ev->getArgument()) {
            _stack.emplace_back(evaluate(ev->getArgument()));
        } else {
            _stack.emplace_back(Literal::buildNull());
        }
        return true;
    }
    if (instanceof<TerminalExpression *>(e))
        _stack.emplace_back(as<TerminalExpression *>(e));
    return false;
}

void Evaluator::onAfter(PsiElement *e) {
    if (instanceof<BinaryExpression *>(e)) {
        auto el = as<BinaryExpression *>(e);
        auto lv = _stack[_stack.size() - 2];
        auto rv = _stack[_stack.size() - 1];
        _stack.pop_back(); _stack.pop_back();
        _stack.emplace_back(handleBinaryExpression(el, lv, rv));
//        std::cout << "binary result " << _stack.back()->toString() << std::endl;
        return;
    }
    if (instanceof<UnaryExpression *>(e)) {
        auto el = as<UnaryExpression *>(e);
        auto ev = _stack.back();
        _stack.pop_back();
        _stack.emplace_back(handleUnaryExpression(el, ev));
        return;
    }
    if (instanceof<MemberExpression *>(e)) {
        _stack.pop_back(); _stack.pop_back();
        _stack.emplace_back(Literal::buildNull());
        return;
    }
    if (instanceof<AssignmentExpression *>(e)) {
        auto el = as<AssignmentExpression *>(e);
        auto lv = _stack[_stack.size() - 2];
        auto rv = _stack[_stack.size() - 1];
        _stack.pop_back(); _stack.pop_back();
        if (!instanceof<Identifier *>(lv))
            throw SyntaxError("Expression is not assignable");
        _stack.emplace_back(handleAssignmentExpression(el, lv, rv));
    }
}

Literal *Evaluator::evaluate(Expression *expression) {
    if (instanceof<Literal *>(expression))
    { return as<Literal *>(expression); }
    if (instanceof<Identifier *>(expression))
    { return _symbols->get(as<Identifier *>(expression)->getName())->getAs<Literal *>(); }
    _stack.clear();
    walk(expression);
    auto _r = _stack.back();
    if (!_r) return nullptr;
    if (instanceof<Identifier *>(_r)) { throw SyntaxError("evaluate failed!"); }
    if (instanceof<Literal *>(_r)) { return as<Literal *>(_r); }
    return nullptr;
}


Literal *Evaluator::handleAssignmentExpression(AssignmentExpression *expr, TerminalExpression *left, TerminalExpression *right) {
    auto _r = evaluate(right);
//    std::cout << "eva  " << left->toString() << " = " << _r->toString() << std::endl;
//    std::cout << "assn " << as<Identifier *>(left)->getName() << " = " << _r->toString() << std::endl;
//    std::cout << "scan " << symbol->getName() << " = " << symbol->get()->toString() << std::endl;
    _symbols->scan(Symbol::build(as<Identifier *>(left), _r));
    return _r;
}

Literal *Evaluator::handleCallExpression(CallExpression *expr) {
    auto callee = expr->getCallee();
    if (!instanceof<Identifier *>(callee))
        throw SyntaxError(callee->toString() + " is not callable!");
    auto funcName = as<Identifier *>(callee)->getName();
    auto symbol = _symbols->get(funcName);
    if (!symbol)
        throw SyntaxError("error: no such function " + funcName);
    if (!symbol->callable())
        throw SyntaxError("error: " + funcName + " not callable");
    std::vector<Literal *> args;
    for (auto arg : expr->getArguments())
        args.emplace_back(evaluate(arg));
    if (symbol->isBuiltinFunction()) {
        auto builtin = symbol->getAs<BuiltinProvider *>();
        return builtin->apply(args);
    }
    auto decl = symbol->getAs<FunctionDeclaration *>();
    return _vm->invoke(_engine->createFunctionScope(), decl, args);
}

Literal *Evaluator::handleUnaryExpression(UnaryExpression *expr, TerminalExpression *e) {
    auto op = expr->getOperator();
    if (!e)
        throw SyntaxError("unary expression exception : void");
    auto _ev = instanceof<Identifier *>(e)
               ? _symbols->get(as<Identifier *>(e)->getName())->getAs<Literal *>()
               : e;
    auto ev = dynamic_cast<Literal *>(_ev);
    if (op == "!") { return Literal::build(! ev->getAsBoolean()); }
    if (op == "~" && (ev->isInteger() || ev->isBoolean())) { return Literal::build(~ev->getAsInteger()); }
    if (op == "+" && (ev->isNumeric() || ev->isString()))  { return ev; }
    if (op == "-" && ev->isNumeric()) { return Literal::build(- ev->getAsNumber()); }
    throw SyntaxError("Invalid unary expression, operation : " + op);
}

Literal *Evaluator::handleBinaryExpression(BinaryExpression *expr, TerminalExpression *left, TerminalExpression *right) {
    if (!left)
        throw SyntaxError("binary expression exception, left : void");
    if (!right)
        throw SyntaxError("binary expression exception, right : void");
    auto op = expr->getOperator();
    auto _lv = dynamic_cast<TerminalExpression *>(left);
    auto _lv_ = instanceof<Identifier *>(_lv)
                ? _symbols->get(as<Identifier *>(_lv)->getName())->getAs<Literal *>()
                : _lv;
    auto lv = dynamic_cast<Literal *>(_lv_);
    auto _rv = dynamic_cast<TerminalExpression *>(right);
    auto _rv_ = instanceof<Identifier *>(_rv)
                ? _symbols->get(as<Identifier *>(_rv)->getName())->getAs<Literal *>()
                : _rv;
    auto rv = dynamic_cast<Literal *>(_rv_);
//    std::cout << "binary " << left->toString() << " " << op << " " << right->toString() << std::endl;
//    std::cout << "lv " << lv->toString() << " " << op << " " << rv->toString() << "\n" << (op == "+") << lv->isInteger() << " " << rv->isInteger() << std::endl;
//    std::cout << "[LANG] Binary \n  left : " << lv->toString() << "\n  right : " << rv->toString() << std::endl;
    if (op == "+" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() + rv->getAsInteger()); }
    if (op == "-" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() - rv->getAsInteger()); }
    if (op == "*" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() * rv->getAsInteger()); }
    if (op == "/" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() / rv->getAsInteger()); }
    if (op == "/" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() / rv->getAsInteger()); }
    if (op == "%" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() % rv->getAsInteger()); }
    if (op == "^" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() ^ rv->getAsInteger()); }
    if (op == "|" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() | rv->getAsInteger()); }
    if (op == "&" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() & rv->getAsInteger()); }

    if (op == "+" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() + rv->getAsNumber()); }
    if (op == "-" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() - rv->getAsNumber()); }
    if (op == "*" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() * rv->getAsNumber()); }
    if (op == "/" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() / rv->getAsInteger()); }
    if (op == "/" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() / rv->getAsNumber()); }
    if (op == "%" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsInteger() % rv->getAsInteger()); }
    if (op == "|" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsInteger() | rv->getAsInteger()); }
    if (op == "&" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsInteger() & rv->getAsInteger()); }
    if (op == ">" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() > rv->getAsNumber()); }
    if (op == ">=" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() >= rv->getAsNumber()); }
    if (op == "<" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() < rv->getAsNumber()); }
    if (op == "<=" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() <= rv->getAsNumber()); }
    if (op == "==" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() == rv->getAsInteger()); }
    if (op == "!=" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() != rv->getAsInteger()); }
    if (op == "==" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() == rv->getAsNumber()); }
    if (op == "!=" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() != rv->getAsNumber()); }
    if (op == ">" && lv->isString() && rv->isString()) { return Literal::build(lv->getString() > rv->getString()); }
    if (op == ">=" && lv->isString() && rv->isString()) { return Literal::build(lv->getString() >= rv->getString()); }
    if (op == "<" && lv->isString() && rv->isString()) { return Literal::build(lv->getString() < rv->getString()); }
    if (op == "<=" && lv->isString() && rv->isString()) { return Literal::build(lv->getString() <= rv->getString()); }
    if (op == "==" && lv->isString() && rv->isString()) { return Literal::build(lv->getString() == rv->getString()); }
    if (op == "!=" && lv->isString() && rv->isString()) { return Literal::build(lv->getString() != rv->getString()); }
    if (op == "+" && lv->isString()) { return Literal::build(lv->getString() + rv->toString()); }
    throw SyntaxError("Invalid binary expression, operation : " + op);
}