// vm: program flow

import {
    Expression,
    BlockStatement,
    BreakStatement,
    ContinueStatement,
    ForStatement,
    FunctionDeclaration,
    IfStatement,
    ReturnStatement,
    WhileStatement
} from "./psi.js";
import {Evaluator} from "./eval.js";
import {ISymbol, ScopeProvider} from "./scope";
import {IValue, ValueSystem} from "./valuesystem";

// here, build linear bytecode
// build code flow by psi(function&statement)
// code flow supported by state/virtual machine

export interface Bytecode {
    toString(): string;
}

export class BtcGoto implements Bytecode {
    tag: string;

    toString(): string {
        return `goto ${this.tag}`
    }

    static build(l: string) {
        const _r = new BtcGoto
        _r.tag = l
        return _r
    }
}

export class BtcTest implements Bytecode {
    expression: Expression;
    tag: string;

    toString(): string {
        return `goto ${this.tag}, test ${this.expression.toString()}`
    }

    static build(e: Expression, l: string) {
        const _r = new BtcTest
        _r.expression = e
        _r.tag = l
        return _r
    }
}

export class BtcEval implements Bytecode {
    expression: Expression;

    toString(): string {
        return `eval ${this.expression.toString()}`
    }

    static build(e: Expression) {
        const _r = new BtcEval
        _r.expression = e
        return _r
    }
}

export class BtcRet implements Bytecode {
    expression: Expression;

    toString(): string {
        return `ret ${this.expression.toString()}`
    }

    static build(e: Expression) {
        const _r = new BtcRet
        _r.expression = e
        return _r
    }
}

export class BtcMark implements Bytecode {
    tag: string;

    static build(l: string) {
        const _r = new BtcMark
        _r.tag = l
        return _r
    }
}

export class BytecodeCompiler {
    private _bytecodes: Bytecode[] = []

    private _stack: Record<string, any>[] = []

    private _theUsedLblIdx: Map<string, number> = new Map

    private static _lblCount: number = 0

    private _csip: number

    // constructor(readonly evaluator: Evaluator) {
    // }

    bytecode(): Bytecode[] {
        return this._bytecodes
    }

    compile(func: FunctionDeclaration) {
        const [lc_0] = this.lbl()
        this._stack.push({type: 'function', end: lc_0})
        this._block(func.body)
        this._mark(lc_0)
        this._stack.pop()
        this.optimize()
        return this
    }

    private _riskCount: number = 0;

    interpret(evaluator: Evaluator): IValue { // jit
        this._csip = -1
        this._riskCount = 0
        while (1) {
            this._riskCount++
            if (this._riskCount > 100) {
                throw new Error(`vm risk`)
            }
            const btc = this.next()
            if (!btc)
                break
            if (btc instanceof BtcEval) {
                // console.debug(`[LANG] eval`, btc.expression.toString())
                evaluator.evaluate(btc.expression)
                continue
            }
            if (btc instanceof BtcTest) {
                const r = evaluator.evaluate(btc.expression)
                // console.debug(`[LANG] test`, btc.expression.toString(), "=>", r.toString())
                if (!ValueSystem.isTrue(r)) {
                    this._csip = this._theUsedLblIdx.get(btc.tag)
                }
                continue
            }
            if (btc instanceof BtcRet) {
                return btc.expression ? evaluator.evaluate(btc.expression) : null
            }
        }
        return null
    }

    private next(): Bytecode {
        if (!this._bytecodes.length) return null
        let btc: Bytecode = null
        while (1) {
            if (this._csip + 1 >= this._bytecodes.length)
                break
            btc = this._bytecodes[++this._csip]
            if (!btc)
                break
            if (btc instanceof BtcMark)
                continue
            if (btc instanceof BtcGoto) {
                this._csip = this._theUsedLblIdx.get(btc.tag)
                continue
            }
            break
        }
        return btc
    }

    private optimize() {
        // TODO: more optimization:
        //       1. remove useless label
        //       2. optimize code flow
        const _r: Bytecode[] = []
        for (const bc of this._bytecodes) {
            if (bc instanceof BtcMark && !this._theUsedLblIdx.has(bc.tag))
                continue
            if (bc instanceof BtcMark && this._theUsedLblIdx.has(bc.tag)) {
                this._theUsedLblIdx.set(bc.tag, _r.length)
            }
            _r.push(bc)
        }
        this._bytecodes = _r
    }

    private _if(stmt: IfStatement) {
        const [lc_0, lc_1] = this.lbl(2)
        this._test(lc_0, stmt.test)
        this._block(stmt.consequent)
        this._goto(lc_1)
        this._mark(lc_0)
        if (stmt.alternate !== null) {
            if (stmt.alternate instanceof IfStatement) {
                this._if(stmt.alternate)
            } else {
                this._block(stmt.alternate)
            }
        }
        this._mark(lc_1)
    }

    private _block(stmts: BlockStatement) {
        for (let i = 0; i < stmts.body.length; i++) {
            const stmt = stmts.body[i]
            if (stmt instanceof Expression) {
                this._eval(stmt)
            } else if (stmt instanceof BreakStatement) {
                this._break(stmt)
            } else if (stmt instanceof ContinueStatement) {
                this._continue(stmt)
            } else if (stmt instanceof ReturnStatement) {
                this._return(stmt)
            } else if (stmt instanceof IfStatement) {
                this._if(stmt)
            } else if (stmt instanceof WhileStatement) {
                this._while(stmt)
            } else if (stmt instanceof ForStatement) {
                this._for(stmt)
            }
        }
    }

    private _break(stmt: BreakStatement) {
        const item = this.findLastLoop()
        if (!item)
            throw new Error(`found none loop!`)
        this._goto(item.end)
    }

    private _continue(stmt: ContinueStatement) {
        const item = this.findLastLoop()
        if (!item)
            throw new Error(`found none loop!`)
        if (item.type === 'while') {
            this._goto(item.test)
        } else if (item.type === 'for') {
            this._goto(item.update)
        }
    }

    private _while(stmt: WhileStatement) {
        const [lc_0, lc_1] = this.lbl(2)
        this._stack.push({type: 'while', test: lc_0, end: lc_1})
        this._mark(lc_0)
        this._test(lc_1, stmt.test)
        this._block(stmt.body)
        this._goto(lc_0)
        this._mark(lc_1)
        this._stack.pop()
    }

    private _for(stmt: ForStatement) {
        const [lc_0, lc_1, lc_2] = this.lbl(3)
        this._stack.push({type: 'for', update: lc_2, end: lc_1})
        this._eval(stmt.init)
        this._mark(lc_0)
        this._test(lc_1, stmt.test)
        this._block(stmt.body)
        this._mark(lc_2)
        this._eval(stmt.update)
        this._goto(lc_0)
        this._mark(lc_1)
        this._stack.pop()
    }

    private _return(stmt: ReturnStatement) {
        if (stmt.argument !== null)
            this._ret(stmt.argument)
        this._goto(this._stack[0].end)
    }

    private _test(another: string, expr: Expression) {
        this._theUsedLblIdx.set(another, -1)
        this.append(BtcTest.build(expr, another))
    }

    private _eval(expr: Expression) {
        this.append(BtcEval.build(expr))
    }

    private _goto(lc: string) {
        this._theUsedLblIdx.set(lc, -1)
        this.append(BtcGoto.build(lc))
    }

    private _mark(lc: string) {
        this.append(BtcMark.build(lc))
    }

    private _ret(expr: Expression) {
        this.append(BtcRet.build(expr))
    }

    private findLastLoop() {
        for (let i = this._stack.length - 1; i > -1; i--) {
            const item = this._stack[i]
            if (['while', 'for'].includes(item.type)) {
                return item
            }
        }
        return null
    }

    private lbl(n: number = 1) {
        const _r: string[] = []
        let i: number = 0
        while (i < n) {
            _r.push(`.LC${BytecodeCompiler._lblCount++}`)
            i++
        }
        return _r
    }

    private append(bytecode: Bytecode) {
        this._bytecodes.push(bytecode)
    }
}

export class VirtualMachine {
    private _btc: Map<FunctionDeclaration, BytecodeCompiler> = new Map

    constructor() {

    }

    compile(func: FunctionDeclaration) {
        if (this._btc.has(func)) return this
        this._btc.set(func, new BytecodeCompiler().compile(func))
        // this._btc.set(func, new BytecodeCompiler(this.engine.evaluator()).compile(func))
        return this
    }

    invoke(scope: ScopeProvider, func: FunctionDeclaration, args: IValue[]): IValue {
        scope.buildScope()
        for (let i = 0; i < func.params.length; i++) {
            scope.scan(new ISymbol(func.params[i].name, args[i]))
        }
        const evaluator = new Evaluator(scope, this)//.setScope(scope).setVM(this)
        const _r = this._btc.get(func).interpret(evaluator)
        scope.popScope()
        return _r
    }

    evaluate(scope: ScopeProvider, expr: Expression): IValue {
        const evaluator = new Evaluator(scope, this)//.setScope(scope).setVM(this)
        return evaluator.evaluate(expr)
    }
}
