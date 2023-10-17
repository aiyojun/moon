#include "Evaluator.h"
#include "types.h"
#include "CallExpression.h"
#include "Identifier.h"
#include "SyntaxError.h"
#include "Runtime.h"
#include "FunctionDeclaration.h"
#include "VirtualMachine.h"
#include "MemberExpression.h"

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
    if (instanceof<Literal *>(expression)) { return as<Literal *>(expression); }
    if (!expression) {
        std::cout << "[LANG] eval expression null !!!\n";
    }
    std::cout << "[LANG] evaluation " << expression->toString() << std::endl;
    _stack.clear();
    walk(expression);
    auto _r = _stack.back();
    if (_r == nullptr) {
        std::cout << "[LANG] eval stack return null !!!\n";
        return nullptr;
    } else if (instanceof<Identifier *>(_r)) {
        auto _p = as<Literal *>(_engine->runtime()->exchange(as<Identifier *>(_r)));
        std::cout << "[LANG] eval result : " << _p->toString() << std::endl;
        return _p;
    } else if (instanceof<Literal *>(_r)) {
        std::cout << "[LANG] eval result : " << _r->toString() << std::endl;
        return as<Literal *>(_r);
    }
    std::cout << "[LANG] eval null !!!" << std::endl;
    return nullptr;
}


Literal *Evaluator::handleAssignmentExpression(AssignmentExpression *expr, TerminalExpression *left, TerminalExpression *right) {
    auto rt = _engine->runtime();
    auto _r = evaluate(right);
    rt->record(dynamic_cast<Identifier *>(left)->getName(), _r);
    return _r;
}

Literal *Evaluator::handleCallExpression(CallExpression *expr) {
//    std::cout << "[LANG] call " << expr->toString() << std::endl;
    auto callee = expr->getCallee();
    if (!instanceof<Identifier *>(callee))
        throw SyntaxError(callee->toString() + " is not callable!");
    auto funcName = as<Identifier *>(callee)->getName();
    auto rt = _engine->runtime();
    auto _ref = rt->ref(funcName);
    if (!_ref)
        throw SyntaxError("error: no such function " + funcName);
    std::vector<Literal *> args;
    for (auto arg : expr->getArguments()) {
        args.emplace_back(evaluate(arg));
    }
    auto func = (*_ref)[funcName];
    if (instanceof<BuiltinProvider *>(func)) {
        auto builtin = as<BuiltinProvider *>(func);
        return builtin->apply(args);
    } else {
        auto decl = as<FunctionDeclaration *>(func);
//        std::cout << "[LANG] Function declaration : " << decl->toString() << std::endl;
        rt->push(new PtCall(decl));
        for (int i = 0; i < decl->getParams().size(); i++) {
            auto param = decl->getParams()[i];
            rt->record(param->getName(), args[i]);
        }
        auto vm = _engine->vm();
        vm->compile(decl);
        auto _r = vm->invoke(decl);
        rt->pop();
        return _r;
    }
}

Literal *Evaluator::handleUnaryExpression(UnaryExpression *expr, TerminalExpression *e) {
    auto op = expr->getOperator();
//    auto e = dynamic_cast<TerminalExpression *>(expr->getArgument());
    if (!e)
        throw SyntaxError("unary expression exception : void");
    auto _ev = instanceof<Identifier *>(e)
               ? _engine->runtime()->exchange(dynamic_cast<Identifier *>(e))
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
                ? _engine->runtime()->exchange(as<Identifier *>(_lv))
                : _lv;
    auto lv = dynamic_cast<Literal *>(_lv_);
    auto _rv = dynamic_cast<TerminalExpression *>(right);
    auto _rv_ = instanceof<Identifier *>(_rv)
                ? _engine->runtime()->exchange(as<Identifier *>(_rv))
                : _lv;
    std::cout << "[LANG] Binary \n  left : " << left->toString() << "\n  right : " << right->toString() << std::endl;
    auto rv = dynamic_cast<Literal *>(_rv_);
    if (op == "+" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() + rv->getAsNumber()); }
    if (op == "-" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() - rv->getAsNumber()); }
    if (op == "*" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() * rv->getAsNumber()); }
    if (op == "/" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() / rv->getAsInteger()); }
    if (op == "/" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsNumber() / rv->getAsNumber()); }
    if (op == "%" && lv->isNumeric() && rv->isNumeric()) { return Literal::build(lv->getAsInteger() % rv->getAsInteger()); }
    if (op == "^" && lv->isInteger() && rv->isInteger()) { return Literal::build(lv->getAsInteger() ^ rv->getAsInteger()); }
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