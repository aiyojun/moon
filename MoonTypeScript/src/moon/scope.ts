import {ClassDeclaration, FunctionDeclaration, VariableDeclaration} from "./psi.js";
import {IValue, ValueSystem} from "./valuesystem.js";

export class Scope {
    private _symbols: Map<string, ISymbol> = new Map;

    contains(name: string): boolean {
        return this._symbols.has(name)
    }

    get(name: string): ISymbol {
        return this._symbols.get(name)
    }

    add(symbol: ISymbol) {
        this._symbols.set(symbol.getName(), symbol)
    }

    remove(name: string) {
        this._symbols.delete(name)
        return this
    }

    toString(): string {
        let ss = ''
        for (const entry of this._symbols) {
            ss += `  ${entry[0]} : ${entry[1].value.toString()}\n`
        }
        return ss
    }
}

export class ScopeProvider {
    private _scopes: Scope[]

    constructor(scopes: Scope[]) {
        this._scopes = scopes
    }

    derive(scope): ScopeProvider {
        return new ScopeProvider([...this._scopes, scope])
    }

    contains(name: string): boolean {
        for (let i = this._scopes.length - 1; i > -1; i--) {
            if (this._scopes[i].contains(name))
                return true
        }
        return false
    }

    get(name: string): ISymbol {
        for (let i = this._scopes.length - 1; i > -1; i--) {
            const _r = this._scopes[i].get(name)
            if (_r) {
                // console.debug(`[LANG] get`, name, "=", _r.value.toString())
                return _r
            }
        }
        return null
    }

    add(symbol: ISymbol) {
        this._scopes[this._scopes.length - 1].add(symbol)
        return this
    }

    buildScope() {
        this._scopes.push(new Scope())
        return this
    }

    popScope() {
        return this._scopes.pop()
    }

    scan(symbol: ISymbol) {
        if (!symbol.value)
            throw new Error(`error: invalid symbol : ${symbol.value?.toString()}`)
        // console.debug(`[LANG] scan`, symbol.getName(), "=", symbol.value.toString())
        const sym = this.get(symbol.getName())
        if (!sym) {
            this.add(symbol);
            return this;
        }
        sym.value = symbol.value;
    }

    toString() {
        let ss = ''
        for (let i = 0; i < this._scopes.length; i++) {
            ss += this._scopes[i].toString();
        }
        return ss
    }
}

export class ISymbol {
    private _id: string = null

    private _value: IValue = null

    constructor(id: string, value: IValue) {
        this._id = id
        this.value = value
    }

    getName(): string {
        return this._id
    }

    get value() {
        return this._value
    }

    set value(value: IValue) {
        this._value = value
    }

    toString() {
        return this._id + " : " + this._value?.toString()
    }
}

export class Organizer {
    private _globalScope: Scope = new Scope()

    createFunctionScope(): ScopeProvider {
        return new ScopeProvider([this._globalScope])
    }

    scanClass(decl: ClassDeclaration) {
        this.setGlobalSymbol(decl.id.name, ValueSystem.buildDeclarativeClass(decl))
        return this
    }

    scanFunction(decl: FunctionDeclaration) {
        this.setGlobalSymbol(decl.id.name, ValueSystem.buildDeclarativeFunction(decl))
        return this
    }

    scanVariable(decl: VariableDeclaration) {
        // todo:
    }

    setGlobalSymbol(name: string, value: IValue) {
        this._globalScope.add(new ISymbol(name, value))
        return this
    }

    removeGlobalSymbol(name: string) {
        this._globalScope.remove(name)
        return this
    }
}
