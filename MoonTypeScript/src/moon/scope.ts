import {ClassDeclaration, FunctionDeclaration, Identifier, Literal, PsiElement, VariableDeclaration} from "./psi";

const isNot = (cls, obj) => !(obj instanceof cls)

export class LightObject extends PsiElement {
    private _properties: Map<string, PsiElement> = new Map;

    set(property: string, value: PsiElement) {
        if (isNot(Literal, value) && isNot(LightObject, value))
            throw new Error(`invalid right value when set LightObject property`)
        this._properties.set(property, value)
        return this
    }

    get(property: string) {
        return this._properties.get(property)
    }

    contains(property: string) {
        return this._properties.has(property)
    }
}

export class FunctionObject extends LightObject {

}

export abstract class BuiltinFunctionObject extends FunctionObject {
    abstract impl(...args: Literal[]): Literal;
}

export class DeclarativeFunctionObject extends FunctionObject {
    private _decl: FunctionDeclaration = null

    set decl(fd: FunctionDeclaration) {
        this._decl = fd
    }

    get decl() {
        return this._decl
    }
}

export class ClassObject extends LightObject {

}

export class BuiltinClassObject extends ClassObject {

}

export class DeclarativeClassObject extends ClassObject {
    private _decl: ClassDeclaration = null

    set decl(cd: ClassDeclaration) {
        this._decl = cd
    }

    get decl() {
        return this._decl
    }
}

// Don't expose the two below to outside.
function createDeclarativeFunctionObject(fd: FunctionDeclaration) {
    const _r = new DeclarativeFunctionObject()
    _r.decl = fd
    return _r
}

function createDeclarativeClassObject(cd: ClassDeclaration) {
    const _r = new DeclarativeClassObject()
    _r.decl = cd
    return _r
}

export class Scope {
    private _symbols: Map<string, Symbol> = new Map;

    contains(name: string): boolean {
        return this._symbols.has(name)
    }

    get(name: string): Symbol {
        return this._symbols.get(name)
    }

    add(symbol: Symbol) {
        this._symbols.set(symbol.getName(), symbol)
    }

    remove(name: string) {
        this._symbols.delete(name)
        return this
    }
}

export class ScopeProvider {
    private _scopes: Scope[]

    constructor(scopes: Scope[]) {
        this._scopes = scopes
    }

    contains(name: string): boolean {
        for (let i = this._scopes.length - 1; i > -1; i--) {
            if (this._scopes[i].contains(name))
                return true
        }
        return false
    }

    get(name: string): Symbol {
        for (let i = this._scopes.length - 1; i > -1; i--) {
            const _r = this._scopes[i].get(name)
            if (_r) return _r
        }
        return null
    }

    add(symbol: Symbol) {
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

    scan(symbol: Symbol) {
        const sym = this.get(symbol.getName())
        if (!sym) {
            this.add(symbol);
            return this;
        }
        sym.value = sym.value;
    }
}

export class Symbol {
    private _id: Identifier = null

    private _value: PsiElement = null

    constructor(id: Identifier, value: PsiElement) {
        this._id = id
        this.value = value
    }

    getName(): string {
        return this._id.name
    }

    get value() {
        return this._value
    }

    set value(value: PsiElement) {
        if (isNot(Literal, value) && isNot(LightObject, value))
            throw new Error(`invalid right value when set Symbol value`)
        this._value = value
    }

    callable() {
        return this._value instanceof FunctionObject
    }

    toString() {
        return this._id.name + " : " + this._value?.toString()
    }
}

export class Organizer {
    private _globalScope: Scope = new Scope()

    createFunctionScope(): ScopeProvider {
        return new ScopeProvider([this._globalScope])
    }

    scanClass(decl: ClassDeclaration) {
        this.setGlobalSymbol(decl.id.name, createDeclarativeClassObject(decl))
        return this
    }

    scanFunction(decl: FunctionDeclaration) {
        this.setGlobalSymbol(decl.id.name, createDeclarativeFunctionObject(decl))
        return this
    }

    scanVariable(decl: VariableDeclaration) {
        // todo:
    }

    setGlobalSymbol(name: string, value: PsiElement) {
        this._globalScope.add(new Symbol(Identifier.build(name), value))
        return this
    }

    removeGlobalSymbol(name: string) {
        this._globalScope.remove(name)
        return this
    }
}
