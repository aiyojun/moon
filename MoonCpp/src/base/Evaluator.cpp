#include "Evaluator.h"
#include "MoonScriptEngine.h"
#include "Runtime.h"
#include "SyntaxError.h"
#include "FunctionDeclaration.h"
#include "VirtualMachine.h"
#include "../types.h"
#include "PsiElementEvaluation.h"

Evaluator::Evaluator(MoonScriptEngine *engine): _engine(engine) {

}

Literal *Evaluator::evaluate(Expression *expression) {
    auto stack = std::vector<TerminalExpression *>{};
    auto evaluation = new PsiElementEvaluation(stack);
    evaluation->walk(expression);
    auto _r = stack.back();
    if (_r == nullptr) {
        return nullptr;
    } else if (instanceof<Identifier *>(_r)) {
        return dynamic_cast<Literal *>(_engine->runtime()->exchange(dynamic_cast<Identifier *>(_r)));
    } else if (instanceof<Literal *>(_r)) {
        return dynamic_cast<Literal *>(_r);
    }
    return nullptr;
}

Literal *Evaluator::handleAssignmentExpression(AssignmentExpression *expr) {
    auto rt = _engine->runtime();
    auto _r = evaluate(expr->getRight());
    rt->record(dynamic_cast<Identifier *>(expr->getLeft())->getName(), _r);
    return nullptr;
}

Literal *Evaluator::handleCallExpression(CallExpression *expr) {
    auto callee = expr->getCallee();
    if (typeid(callee) != typeid(Identifier *))
        throw SyntaxError(callee->toString() + " is not callable!");
    auto funcName = dynamic_cast<Identifier *>(callee)->getName();
    auto rt = _engine->runtime();
    auto _ref = rt->ref(funcName);
    if (_ref == nullptr)
        throw SyntaxError("error: no such function " + funcName);
    std::vector<Literal *> args;
    for (auto arg : expr->getArguments()) {
        args.emplace_back(evaluate(arg));
    }
    auto func = (*_ref)[funcName];
    if (typeid(func) == typeid(BuiltinProvider *)) {
        auto builtin = dynamic_cast<BuiltinProvider *>(func);
        return builtin->apply(args);
    } else {
        auto decl = dynamic_cast<FunctionDeclaration *>(func);
        rt->push(new PtCall(decl));
        for (int i = 0; i < decl->getParams().size(); i++) {
            auto param = decl->getParams()[i];
            rt->record(param->getName(), args[i]);
        }
        auto _r = _engine->vm()->invoke(decl);
        rt->pop();
        return _r;
    }
}

Literal *Evaluator::handleUnaryExpression(UnaryExpression *expr) {
    auto op = expr->getOperator();
    auto e = dynamic_cast<TerminalExpression *>(expr->getArgument());
    auto _ev = instanceof<Identifier *>(e)
            ? _engine->runtime()->exchange(dynamic_cast<Identifier *>(e))
            : e;
    auto ev = dynamic_cast<Literal *>(_ev);
    auto _r = new Literal;
    if ((PsiUtils::isFlatNumber(ev) || PsiUtils::isNull(ev)) && op == "!") {
        _r->value() = !std::any_cast<int>(ev->value());
        return _r;
    }
    if (PsiUtils::isFlatNumber(ev) && op == "~") {
        _r->value() = ~std::any_cast<int>(ev->value());
        return _r;
    }
    if (PsiUtils::isFlatNumber(ev) && op == "+") {
        _r->value() = std::any_cast<int>(ev->value());
        return _r;
    }
    if (PsiUtils::isFlatNumber(ev) && op == "-") {
        _r->value() = -std::any_cast<int>(ev->value());
        return _r;
    }
    throw SyntaxError("unknown unary expression, operation : " + op);
}

Literal *Evaluator::handleBinaryExpression(BinaryExpression *expr) {
    auto op = expr->getOperator();
    auto _lv = dynamic_cast<TerminalExpression *>(expr->getLeft());
    auto __lv = instanceof<Identifier *>(_lv)
               ? _engine->runtime()->exchange(dynamic_cast<Identifier *>(_lv))
               : _lv;
    auto lv = dynamic_cast<Literal *>(__lv);
    auto _rv = dynamic_cast<TerminalExpression *>(expr->getRight());
    auto __rv = instanceof<Identifier *>(_rv)
                ? _engine->runtime()->exchange(dynamic_cast<Identifier *>(_rv))
                : _lv;
    auto rv = dynamic_cast<Literal *>(__rv);
    auto _r = new Literal;
    if (PsiUtils::isNumber(lv) && PsiUtils::isNumber(rv) && op == "+") {
        _r->value() = std::any_cast<int>(lv) + std::any_cast<int>(rv);
        return _r;
    }
    return nullptr;
}



