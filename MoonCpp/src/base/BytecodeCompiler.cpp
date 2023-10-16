#include "BytecodeCompiler.h"
#include "../types.h"
#include "SyntaxError.h"
#include "Evaluator.h"

int BytecodeCompiler::_lblCount = 0;

BytecodeCompiler::BytecodeCompiler(Evaluator *evaluator): _evaluator(evaluator) {

}

void BytecodeCompiler::compile(FunctionDeclaration *func) {
    auto lc = lbl();
    _stack.emplace_back(std::map<std::string, std::string>{
        {"type", "function"}, {"end", lc[0]}});
    handleBlockStatement(func->getBody());
    emitMark(lc[0]);
    _stack.pop_back();
    optimize();
}

Literal *BytecodeCompiler::interpret() {
    _csip = -1;
    while (1) {
        auto btc = next();
        if (!btc)
            break;
        if (instanceof<BtcEval *>(btc)) {
            _evaluator->evaluate(dynamic_cast<BtcEval *>(btc)->getExpression());
            continue;
        }
        if (instanceof<BtcTest *>(btc)) {
            auto b = dynamic_cast<BtcTest *>(btc);
            auto r = _evaluator->evaluate(b->getExpression());
            if (!r->value().has_value()) {
                _csip = _lblIdxInUsing[b->getTag()];
            }
            continue;
        }
        if (instanceof<BtcRet *>(btc)) {
            auto b = dynamic_cast<BtcRet *>(btc);
            return b->getExpression() ? _evaluator->evaluate(b->getExpression()) : nullptr;
        }
    }
    return nullptr;
}

Bytecode *BytecodeCompiler::next() {
    if (_bytecodes.empty()) return nullptr;
    Bytecode *btc = nullptr;
    while (1) {
        if (_csip + 1 >= _bytecodes.size())
            break;
        btc = _bytecodes[++_csip];
        if (!btc)
            break;
        if (instanceof<BtcMark *>(btc))
            continue;
        if (instanceof<BtcGoto *>(btc)) {
            _csip = _lblIdxInUsing[dynamic_cast<BtcGoto *>(btc)->getTag()];
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
            auto b = dynamic_cast<BtcMark *>(bc);
            if (_lblIdxInUsing.find(b->getTag()) != _lblIdxInUsing.end()) {
                _lblIdxInUsing[b->getTag()] = _r.size();
            }
        }
    }
    _bytecodes = _r;
}

void BytecodeCompiler::handleIfStatement(IfStatement *stmt) {
    auto lc = lbl();
    emitTest(lc[0], stmt->getTest());
    handleBlockStatement(stmt->getConsequent());
    emitMark(lc[0]);
    if (!stmt->getAlternate()) return;
    if (instanceof<IfStatement *>(stmt->getAlternate())) {
        handleIfStatement(dynamic_cast<IfStatement *>(stmt->getAlternate()));
    } else {
        handleBlockStatement(dynamic_cast<BlockStatement *>(stmt->getAlternate()));
    }
}

void BytecodeCompiler::handleBlockStatement(BlockStatement *stmts) {
    for (int i = 0; i < stmts->getBody().size(); i++) {
        auto stmt = stmts->getBody()[i];

    }
}

void BytecodeCompiler::handleWhileStatement(WhileStatement *stmt) {
    auto lc = lbl(2);
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
    auto lc = lbl(3);
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

std::vector<std::string> BytecodeCompiler::lbl(int n) {
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
    for (int i = _stack.size() - 1; i > -1; i--) {
        auto item = _stack[i];
        if (std::find(loopTypes.begin(), loopTypes.end(), item["type"]) != loopTypes.end()) {
            return &_stack[i];
        }
    }
    return nullptr;
}
