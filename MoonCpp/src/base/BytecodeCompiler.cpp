#include "types.h"
#include "BytecodeCompiler.h"
#include "SyntaxError.h"
#include "Evaluator.h"
#include "Evaluation.h"
#include "ValueSystem.h"
#include "debug/Debugger.h"

int BytecodeCompiler::_lblCount = 0;

BytecodeCompiler::BytecodeCompiler()
        : _csip(0) {

}

void BytecodeCompiler::compile(FunctionDeclaration *func) {
    _lblCount = 0;
    auto lc = labels();
    _stack.emplace_back(std::map<std::string, std::string>{
        {"type", "function"}, {"end", lc[0]}});
    handleBlockStatement(func->getBody());
    emitMark(lc[0]);
    _stack.pop_back();
    optimize();
}

IValue *BytecodeCompiler::interpret(Evaluation *evaluator) {
    _csip = -1;
    std::cout << "BytecodeCompiler::interpret" << std::endl;
    while (true) {
        auto btc = next();
        if (!btc)
            break;
        if (instanceof<BtcEval *>(btc)) {
            evaluator->evaluate(as<BtcEval *>(btc)->getExpression());
//            Debug() << "eval : " << as<BtcEval *>(btc)->getExpression() << Debugger::_end;
            std::cout << "eval : " << as<BtcEval *>(btc)->getExpression() << std::endl;
            continue;
        }
        if (instanceof<BtcTest *>(btc)) {
            auto b = as<BtcTest *>(btc);
            auto r = evaluator->evaluate(b->getExpression());
            std::cout << "test : " << b->getExpression() << " result : " << r << std::endl;
            if (!ValueSystem::isTrue(r)) {
                _csip = _lblIdxInUsing[b->getTag()];
            }
            continue;
        }
        if (instanceof<BtcRet *>(btc)) {
            auto b = as<BtcRet *>(btc);
            return b->getExpression() ? evaluator->evaluate(b->getExpression()) : nullptr;
        }
    }
    return nullptr;
}

Bytecode *BytecodeCompiler::next() {
    if (_bytecodes.empty()) return nullptr;
    Bytecode *btc = nullptr;
    while (true) {
        if (_csip + 1 >= _bytecodes.size())
            break;
        btc = _bytecodes[++_csip];
        if (!btc)
            break;
        if (instanceof<BtcMark *>(btc))
            continue;
        if (instanceof<BtcGoto *>(btc)) {
            _csip = _lblIdxInUsing[as<BtcGoto *>(btc)->getTag()];
            continue;
        }
        break;
    }
    return btc;
}

void BytecodeCompiler::optimize() {
    std::vector<Bytecode *> _r;
    for (auto bc : _bytecodes) {
        if (instanceof<BtcMark *>(bc)) {
            auto b = as<BtcMark *>(bc);
            if (_lblIdxInUsing.find(b->getTag()) == _lblIdxInUsing.end()) {
                continue;
            } else {
                _lblIdxInUsing[b->getTag()] = (int) _r.size();
            }
        }
        _r.emplace_back(bc);
    }
    _bytecodes = _r;
}

void BytecodeCompiler::handleIfStatement(IfStatement *stmt) {
    auto lc = labels(2);
    emitTest(lc[0], stmt->getTest());
    handleBlockStatement(stmt->getConsequent());
    emitGoto(lc[1]);
    emitMark(lc[0]);
    if (stmt->getAlternate()) {
        if (instanceof<IfStatement *>(stmt->getAlternate())) {
            handleIfStatement(as<IfStatement *>(stmt->getAlternate()));
        } else {
            handleBlockStatement(as<BlockStatement *>(stmt->getAlternate()));
        }
    }
    emitMark(lc[1]);
}

void BytecodeCompiler::handleBlockStatement(BlockStatement *stmts) {
    for (auto stmt : stmts->getBody()) {
        if (instanceof<Expression *>(stmt)) {
            emitEval(as<Expression *>(stmt));
        } else if (instanceof<BreakStatement *>(stmt)) {
            handleBreakStatement(as<BreakStatement *>(stmt));
        } else if (instanceof<ContinueStatement *>(stmt)) {
            handleContinueStatement(as<ContinueStatement *>(stmt));
        } else if (instanceof<ReturnStatement *>(stmt)) {
            handleReturnStatement(as<ReturnStatement *>(stmt));
        } else if (instanceof<IfStatement *>(stmt)) {
            handleIfStatement(as<IfStatement *>(stmt));
        } else if (instanceof<WhileStatement *>(stmt)) {
            handleWhileStatement(as<WhileStatement *>(stmt));
        } else if (instanceof<ForStatement *>(stmt)) {
            handleForStatement(as<ForStatement *>(stmt));
        }
    }
}

void BytecodeCompiler::handleWhileStatement(WhileStatement *stmt) {
    auto lc = labels(2);
    _stack.emplace_back(std::map<std::string, std::string>{
        {"type", "while"}, {"test", lc[0]}, {"end", lc[1]}});
    emitMark(lc[0]);
    emitTest(lc[1], stmt->getTest());
    handleBlockStatement(stmt->getBody());
    emitGoto(lc[0]);
    emitMark(lc[1]);
    _stack.pop_back();
}

void BytecodeCompiler::handleForStatement(ForStatement *stmt) {
    auto lc = labels(3);
    _stack.emplace_back(std::map<std::string, std::string>{
        {"type", "for"}, {"update", lc[2]}, {"end", lc[1]}});
    emitEval(stmt->getInit());
    emitMark(lc[0]);
    emitTest(lc[1], stmt->getTest());
    handleBlockStatement(stmt->getBody());
    emitMark(lc[2]);
    emitEval(stmt->getUpdate());
    emitGoto(lc[0]);
    emitMark(lc[1]);
    _stack.pop_back();
}

void BytecodeCompiler::handleBreakStatement(BreakStatement *stmt) {
    auto item = findLastLoop();
    if (!item)
        throw SyntaxError("Found none loop!");
    emitGoto((*item)["end"]);
}

void BytecodeCompiler::handleContinueStatement(ContinueStatement *stmt) {
    auto item = findLastLoop();
    if (!item)
        throw SyntaxError("Found none loop!");
    if ((*item)["type"] == "while") {
        emitGoto((*item)["test"]);
    } else if ((*item)["type"] == "for") {
        emitGoto((*item)["update"]);
    }
}

void BytecodeCompiler::handleReturnStatement(ReturnStatement *stmt) {
    if (stmt->getArgument()) {
        emitRet(stmt->getArgument());
    }
    emitGoto(_stack[0]["end"]);
}

void BytecodeCompiler::emitTest(const std::string &label, Expression *expr) {
    _lblIdxInUsing[label] = -1;
    _bytecodes.emplace_back(new BtcTest(label, expr));
}

void BytecodeCompiler::emitEval(Expression *expr) {
    _bytecodes.emplace_back(new BtcEval(expr));
}

void BytecodeCompiler::emitGoto(const std::string &label) {
    _lblIdxInUsing[label] = -1;
    _bytecodes.emplace_back(new BtcGoto(label));
}

void BytecodeCompiler::emitMark(const std::string &label) {
    _bytecodes.emplace_back(new BtcMark(label));
}

void BytecodeCompiler::emitRet(Expression *expr) {
    _bytecodes.emplace_back(new BtcRet(expr));
}

std::vector<std::string> BytecodeCompiler::labels(int n) {
    std::vector<std::string> _r;
    int i = 0;
    while (i < n) {
        _r.emplace_back(".LC" + std::to_string(_lblCount++));
        i++;
    }
    return std::move(_r);
}

std::map<std::string, std::string> *BytecodeCompiler::findLastLoop() {
    std::vector<std::string> loopTypes{"while", "for"};
    for (int i = (int) _stack.size() - 1; i > -1; i--) {
        auto item = _stack[i];
        if (std::find(loopTypes.begin(), loopTypes.end(), item["type"]) != loopTypes.end()) {
            return &_stack[i];
        }
    }
    return nullptr;
}
