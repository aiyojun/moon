import {
    CallExpression,
    ClassDeclaration,
    FunctionDeclaration,
    Identifier, Literal,
    Program,
    PsiElement,
    VariableDeclaration
} from "./psi.js";
import {Evaluator} from "./eval.js";
import {VirtualMachine} from "./vm.js";
import {PsiBuilder} from "./ast";

// Moon -> Engine -> VirtualMachine -> BytecodeGenerator
// TODO: builtin registering mechanism

export class BuiltinProvider {
    constructor(readonly name: string, readonly impl: Function) {

    }
}

// callstack point
export class StkPt {
    el: PsiElement
    sblTbl: Map<string, any> = new Map

    constructor(el: PsiElement) {
        this.el = el
    }
}

export class GlobalPt extends StkPt {
    static self: GlobalPt = new GlobalPt(null)
}

export class CallPt extends StkPt {
    ret: any;
}

export class LoopPt extends StkPt {
}

export class BlockPt extends StkPt {
}

export class Pt {
    static call(el: PsiElement) {
        return new CallPt(el)
    }

    static loop(el: PsiElement) {
        return new LoopPt(el)
    }

    static block(el: PsiElement) {
        return new BlockPt(el)
    }
}

export class Runtime {
    // save identifier and its value
    private _callstack: Array<StkPt> = []

    constructor() {
        this._callstack.push(GlobalPt.self)
    }

    record(id: string, entity: any) {
        const _refs = this.ref(id)
        _refs !== null ? _refs.set(id, entity) : this._callstack[this._callstack.length - 1].sblTbl.set(id, entity)
    }

    exchange(id: Identifier) {
        const refs = this.ref(id.name)
        if (refs === null) {
            // console.info(this.interpreter.callstack())
            throw new Error(`no such identifier : ${id.name}`)
        }
        return refs.get(id.name)
    }

    func(): CallPt {
        for (let i = this._callstack.length - 1; i > -1; i--) {
            const sco = this._callstack[i]
            if (sco instanceof CallPt)
                return sco
        }
        return null
    }

    ref(id: string) {
        let index = this._callstack.length - 1
        while (index > -1) {
            if (this._callstack[index].sblTbl.has(id))
                return this._callstack[index].sblTbl
            index--
        }
        return null
    }

    push(pt: StkPt) {
        this._callstack.push(pt)
        return this
    }

    pop() {
        return this._callstack.pop()
    }
}

export class MoonScriptEngine {
    private _program: Program = null

    private _classes: Map<string, ClassDeclaration> = new Map

    private _builder: PsiBuilder = new PsiBuilder()

    private _runtime: Runtime = new Runtime()

    private readonly _evaluator: Evaluator

    private readonly _vm: VirtualMachine

    constructor() {
        this._evaluator = new Evaluator(this)
        this._vm = new VirtualMachine(this)
    }

    compile(program: string) {
        this.load(this._builder.compile(program).program())
        return this
    }

    vm() {
        return this._vm
    }

    runtime() {
        return this._runtime
    }

    evaluator() {
        return this._evaluator
    }

    run() {
        const _main = new CallExpression()
        _main.callee = Identifier.build("main")
        _main.arguments = [Literal.build(0), Literal.build(null)]
        return this._evaluator.evaluate(_main)
    }

    toString() {
        let buffer = ""
        buffer += "Type System:\n"
        this._classes.forEach((cls, identifier) => {
            buffer += `  class ${identifier} {\n`
            cls.variables.forEach(variable => {
                buffer += `    ${variable.id.name};\n`
            })
            cls.methods.forEach(method => {
                buffer += `    ${method.id.name} ( ${method.params.map(p => p.name).join(", ")} );\n`
            })
            buffer += `  }`
        })
        return buffer
    }

    private load(p: Program) {
        this._program = p
        this._program.body.forEach(decl => {
            if (decl instanceof ClassDeclaration) {
                this._classes.set(decl.id.name, decl)
                return
            }
            if (decl instanceof VariableDeclaration) {
                this._runtime.record(decl.id.name, decl)
                return
            }
            if (decl instanceof FunctionDeclaration) {
                this._runtime.record(decl.id.name, decl)
                this._vm.compile(decl)
                return
            }
        })
        const println = new BuiltinProvider("println", (...args) => {
            let stream = ''
            for (let i = 0; i < args.length; i++) {
                stream += `${args[i]}`
            }
            console.info("%c[MOON]", "color: #88cc88", `${stream}`)
        })
        this._runtime.record(println.name, println)
        return this
    }
}




