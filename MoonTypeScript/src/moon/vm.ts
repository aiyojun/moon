// vm: program flow
import * as psi from "./psi.js"
import {BuiltinFunctionValue, CallableValue, Executor, IValue, ValueSystem} from "./valuesystem.js";
import {ISymbol, Organizer, ScopeProvider} from "./scope.js";
import {Evaluator} from "./eval.js";
import {PsiBuilder} from "./ast.js";
/**
 * The definition of bytecode is so heavy!
 * @todo: Replace the original bytecode class by real bytecode!
 */
abstract class Bytecode {
    abstract toString(): string;
}
class BtcGoto implements Bytecode {
    constructor(readonly tag: string) {}
    toString(): string { return `goto ${this.tag}` }
}
class BtcTest implements Bytecode {
    constructor(readonly expression: psi.Expression, readonly tag: string) { }
    toString(): string { return `goto ${this.tag}, test ${this.expression.toString()}` }
}
class BtcEval implements Bytecode {
    constructor(readonly expression: psi.Expression) { }
    toString(): string { return `eval ${this.expression.toString()}` }
}
class BtcRet implements Bytecode {
    constructor(readonly expression: psi.Expression) { }
    toString(): string { return `ret ${this.expression.toString()}` }
}
class BtcMark implements Bytecode {
    constructor(readonly tag: string) { }
}

class Compiler {
    private _bytecodes: Bytecode[] = []
    private _localLabelCount: number = 0
    private _localLabelRecordStack: Record<string, any>[] = []

    getBytecodes(): Bytecode[] { return this._bytecodes }

    reset() { this._bytecodes = []; this._localLabelCount = 0; this._localLabelRecordStack = []; return this }

    compile(func: psi.FunctionDeclaration) {
        this.handleFunctionDeclaration(func)
        return this
    }

    private handleFunctionDeclaration(func: psi.FunctionDeclaration) {
        const [lc_0] = this.allocate()
        this._localLabelRecordStack.push({type: 'function', end: lc_0})
        this.handleBlockStatement(func.body)
        this.emitMark(lc_0)
        this._localLabelRecordStack.pop()
    }

    private handleIfStatement(stmt: psi.IfStatement) {
        const [lc_0, lc_1] = this.allocate(2)
        this.emitTest(lc_0, stmt.test)
        this.handleBlockStatement(stmt.consequent)
        this.emitGoto(lc_1)
        this.emitMark(lc_0)
        if (stmt.alternate !== null) {
            if (stmt.alternate instanceof psi.IfStatement) {
                this.handleIfStatement(stmt.alternate)
            } else {
                this.handleBlockStatement(stmt.alternate)
            }
        }
        this.emitMark(lc_1)
    }

    private handleBlockStatement(stmts: psi.BlockStatement) {
        for (let i = 0; i < stmts.body.length; i++) {
            const stmt = stmts.body[i]
            if (stmt instanceof psi.Expression) {
                this.emitEval(stmt)
            } else if (stmt instanceof psi.BreakStatement) {
                this.handleBreakStatement(stmt)
            } else if (stmt instanceof psi.ContinueStatement) {
                this.handleContinueStatement(stmt)
            } else if (stmt instanceof psi.ReturnStatement) {
                this.handleReturnStatement(stmt)
            } else if (stmt instanceof psi.IfStatement) {
                this.handleIfStatement(stmt)
            } else if (stmt instanceof psi.WhileStatement) {
                this.handleWhileStatement(stmt)
            } else if (stmt instanceof psi.ForStatement) {
                this.handleForStatement(stmt)
            }
        }
    }

    private handleBreakStatement(stmt: psi.BreakStatement) {
        const item = this.getLastLoop()
        if (!item)
            throw new Error(`found none loop!`)
        this.emitGoto(item.end)
    }

    private handleContinueStatement(stmt: psi.ContinueStatement) {
        const item = this.getLastLoop()
        if (!item)
            throw new Error(`found none loop!`)
        if (item.type === 'while') {
            this.emitGoto(item.test)
        } else if (item.type === 'for') {
            this.emitGoto(item.update)
        }
    }

    private handleWhileStatement(stmt: psi.WhileStatement) {
        const [lc_0, lc_1] = this.allocate(2)
        this._localLabelRecordStack.push({type: 'while', test: lc_0, end: lc_1})
        this.emitMark(lc_0)
        this.emitTest(lc_1, stmt.test)
        this.handleBlockStatement(stmt.body)
        this.emitGoto(lc_0)
        this.emitMark(lc_1)
        this._localLabelRecordStack.pop()
    }

    private handleForStatement(stmt: psi.ForStatement) {
        const [lc_0, lc_1, lc_2] = this.allocate(3)
        this._localLabelRecordStack.push({type: 'for', update: lc_2, end: lc_1})
        this.emitEval(stmt.init)
        this.emitMark(lc_0)
        this.emitTest(lc_1, stmt.test)
        this.handleBlockStatement(stmt.body)
        this.emitMark(lc_2)
        this.emitEval(stmt.update)
        this.emitGoto(lc_0)
        this.emitMark(lc_1)
        this._localLabelRecordStack.pop()
    }

    private handleReturnStatement(stmt: psi.ReturnStatement) {
        if (stmt.argument !== null)
            this.emitRet(stmt.argument)
        this.emitGoto(this._localLabelRecordStack[0].end)
    }

    private emitTest(another: string, expr: psi.Expression) { this._bytecodes.push(new BtcTest(expr, another)) }

    private emitEval(expr: psi.Expression) { this._bytecodes.push(new BtcEval(expr)) }

    private emitGoto(lc: string) { this._bytecodes.push(new BtcGoto(lc)) }

    private emitMark(lc: string) { this._bytecodes.push(new BtcMark(lc)) }

    private emitRet(expr: psi.Expression) { this._bytecodes.push(new BtcRet(expr)) }

    private getLastLoop(): Record<string, any> { return this._localLabelRecordStack.reverse().filter(rc => ['while', 'for'].includes(rc['type']))[0] }

    private allocate(n: number = 1): string[] { return new Array(n).fill('').map(_ => `.L${this._localLabelCount++}`) }
}

export class StackFrame extends Evaluator {
    private _csip: number
    private _scope: ScopeProvider
    private _bytecodes: Bytecode[]
    private _keyPoints: Map<string, number> = new Map
    private _vm: VirtualMachine
    setScope(scope: ScopeProvider) { this._scope =  scope; return this }
    setBytecodes(bts: Bytecode[]) { this._bytecodes = bts; return this }
    setVirtualMachine(vm: VirtualMachine) { this._vm = vm; return this }
    getScope(): ScopeProvider { return this._scope; }
    async callTrap(callee: CallableValue, ...args: IValue[]): Promise<IValue> {
        callee.setScope(this.getScope()).setExecutor(this._vm)
        return await callee.invoke(...args);
    }
    async interpret() {
        this.analysis()
        this._csip = -1
        while (1) {
            const btc = this.next()
            if (!btc)
                break
            if (btc instanceof BtcEval) {
                await this.evaluate(btc.expression)
                continue
            }
            if (btc instanceof BtcTest) {
                const r = await this.evaluate(btc.expression)
                if (!ValueSystem.isTrue(r)) {
                    this._csip = this._keyPoints.get(btc.tag)
                }
                continue
            }
            if (btc instanceof BtcRet ) {
                return btc.expression ? await this.evaluate(btc.expression) : null
            }
        }
        return null
    }
    private analysis() {
        // TODO: more optimization:
        //       1. remove useless label
        //       2. optimize code flow
        this._keyPoints.clear()
        this._bytecodes.forEach((btc, i) => {
            if (btc instanceof BtcGoto) { this._keyPoints.set(btc.tag, i); return }
            if (btc instanceof BtcTest) { this._keyPoints.set(btc.tag, i); return }
        })
        return this
    }
    private next(): Bytecode {
        if (!this._bytecodes.length) return null
        let btc: Bytecode = null
        while (1) {
            if (this._csip + 1 >= this._bytecodes.length) break
            btc = this._bytecodes[++this._csip]
            if (!btc) break
            if (btc instanceof BtcMark) continue
            if (btc instanceof BtcGoto) { this._csip = this._keyPoints.get(btc.tag); continue }
            break
        }
        return btc
    }
}

export class VirtualMachine implements Executor {
    private _functions: Map<psi.FunctionDeclaration, Bytecode[]> = new Map
    private _callstack: StackFrame[] = []
    private _compiler: Compiler = new Compiler()
    async execute(scope: ScopeProvider, decl: psi.FunctionDeclaration, ...args: IValue[]): Promise<IValue> {
        if (!this._functions.has(decl))
            this._functions.set(decl, this._compiler.reset().compile(decl).getBytecodes())
        const bytecodes = this._functions.get(decl)
        const stackFrame = new StackFrame().setBytecodes(bytecodes).setVirtualMachine(this).setScope(scope)
        this._callstack.push(stackFrame)
        scope.buildScope()
        for (let i = 0; i < decl.params.length; i++)
            scope.scan(new ISymbol(decl.params[i].name, args[i]))
        const _r = await stackFrame.interpret()
        scope.popScope()
        this._callstack.pop()
        return _r
    }
}

export class ScriptEngine {
    private _org: Organizer
    private _vm : VirtualMachine
    private _builder: PsiBuilder
    private _program: psi.Program

    constructor() {
        this._builder = new PsiBuilder()
        this._org = new Organizer()
        this._vm = new VirtualMachine()
    }

    compile(program: string) {
        this._program = this._builder.compile(program).program()
        for (const decl of this._program.body) {
            if (decl instanceof psi.FunctionDeclaration) {
                this._org.scanFunction(decl)
                continue
            }
            if (decl instanceof psi.ClassDeclaration) {
                this._org.scanClass(decl)
            }
        }
        return this
    }

    inject(name: string, func: BuiltinFunctionValue) { this._org.setGlobalSymbol(name, func); return this }

    async main() {
        let runner: psi.FunctionDeclaration = null
        for (const decl of this._program.body) {
            if (decl instanceof psi.FunctionDeclaration && decl.id.name === 'main') {
                runner = decl
                break
            }
        }
        if (!runner)
            throw new Error(`No entry function main!`)
        return ValueSystem.valueOf(await this._vm.execute(this._org.createFunctionScope(), runner))
    }
}
