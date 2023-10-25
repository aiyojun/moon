import {Organizer} from "./scope.js";
import {CallExpression, ClassDeclaration, FunctionDeclaration, Identifier, Literal, Program,} from "./psi.js";
import {VirtualMachine} from "./vm.js";
import {PsiBuilder} from "./ast.js";
import {BuiltinFunctionValue, IValue} from "./valuesystem.js";

// Moon -> Engine -> VirtualMachine -> BytecodeGenerator
// TODO: builtin registering mechanism

class PrintFunction extends BuiltinFunctionValue {
    invoke(...args: IValue[]): IValue {
        let stream = ''
        for (let i = 0; i < args.length; i++) {
            stream += `${args[i].toString()}`
        }
        console.debug("%c[MOON]", "color: #88cc88", `${stream}`)
        return null;
    }
}

export class MoonScriptEngine {
    private _org: Organizer

    private _program: Program = null

    private _classes: Map<string, ClassDeclaration> = new Map

    private _builder: PsiBuilder = new PsiBuilder()

    private readonly _vm: VirtualMachine

    constructor() {
        this._org = new Organizer()
        this._vm = new VirtualMachine()
    }

    compile(program: string) {
        // console.debug(`[LANG] compile`)
        this._program = this._builder.compile(program).program()
        for (const decl of this._program.body) {
            if (decl instanceof FunctionDeclaration) {
                this._org.scanFunction(decl)
                this._vm.compile(decl)
                continue
            }
            if (decl instanceof ClassDeclaration) {
                this._org.scanClass(decl)
            }
        }
        this._org.setGlobalSymbol("println", new PrintFunction())
        return this
    }

    run() {
        // console.debug(`[LANG] run`)
        const _main = new CallExpression()
        _main.callee = Identifier.build("main")
        // _main.arguments = [Literal.build(0), Literal.build(null)]
        _main.mount()
        return this._vm.evaluate(this._org.createFunctionScope(), _main)
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
}
