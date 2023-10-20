import {ClassDeclaration, FunctionDeclaration} from "./psi.js";
import {ISymbol, Scope, ScopeProvider} from "./scope.js";
import {VirtualMachine} from "./vm.js";

export class Ref {
    private _ptr: ObjectValue = null

    private _key: string = null

    private _idx: number = -1

    private constructor() {

    }

    setValue(v: IValue) {
        if (this._ptr instanceof ArrayValue) {
            this._ptr.setItem(this._idx, v)
        } else {
            this._ptr.setProperty(this._key, v)
        }
    }

    static refObject(obj: ObjectValue, key: string): Ref {
        const _r = new Ref()
        _r._ptr = obj
        _r._key = key
        return _r
    }

    static refArray(obj: ArrayValue, index: number): Ref {
        const _r = new Ref()
        _r._ptr = obj
        _r._idx = index
        return _r
    }
}

export class IValue {
    protected _ref: Ref = null

    hasRef(): boolean {
        return this._ref !== null
    }

    getRef(): Ref {
        return this._ref
    }

    setRef(ref: Ref) {
        this._ref = ref
        return this
    }

    clearRef() {
        this._ref = null
        return this
    }

    toString(): string {
        return 'IValue'
    }
}

export class BaseValue extends IValue {
    toString(): string {
        return 'BaseValue'
    }
}

export class NumberValue extends BaseValue {
    private _value: number;

    set value(v: number) {
        this._value = v
    }

    get value(): number {
        return this._value
    }

    constructor(v: number) {
        super();
        this._value = v
    }

    toString(): string {
        return `${this._value}`;
    }
}

export class BooleanValue extends BaseValue {
    private _value: boolean;

    set value(v: boolean) {
        this._value = v
    }

    get value(): boolean {
        return this._value
    }

    constructor(v: boolean) {
        super();
        this._value = v
    }

    toString(): string {
        return this._value ? "true" : "false";
    }
}

export class ObjectValue extends IValue {
    protected _isNull: boolean = true

    private _properties: Map<string, IValue> = new Map

    isNull() {
        return this._isNull
    }

    contains(property: string) {
        return this._properties.has(property)
    }

    getProperty(name: string) {
        return this._properties.get(name)
    }

    setProperty(name: string, value: IValue) {
        this._properties.set(name, value)
        return this
    }

    toString(): string {
        if (this._isNull) return "null"
        const _r: Record<string, any> = {}
        for (let entry of this._properties) {
            if (entry[1] instanceof BooleanValue) {
                _r[entry[0]] = entry[1].value
            } else if (entry[1] instanceof NumberValue) {
                _r[entry[0]] = entry[1].value
            } else if (entry[1] instanceof CallableValue) {

            } else if (entry[1] instanceof ObjectValue && entry[1].isNull()) {
                _r[entry[0]] = null
            } else {
                _r[entry[0]] = entry[1].toString()
            }
        }
        return JSON.stringify(_r)
    }
}

export class ArrayValue extends ObjectValue {
    private _item: IValue[] = []

    setItem(i: number, v: IValue) {
        this._item[i] = v
        return this
    }

    getItem(i: number) {
        return this._item[i]
    }

    addItem(v: IValue) {
        this._item.push(v)
        return this
    }

    splice(from: number, length: number) {
        this._item.splice(from, length)
    }
}

export class StringValue extends ObjectValue {
    private _value: string;

    constructor(v: string) {
        super();
        this._isNull = false
        this._value = v
    }

    get value() {
        return this._value
    }

    set value(v: string) {
        this._value = v
    }

    toString(): string {
        return this._value;
    }
}

export abstract class CallableValue extends ObjectValue {
    protected _scope: ScopeProvider

    protected _vm: VirtualMachine

    setScope(scope: ScopeProvider) {
        this._scope = scope
        return this
    }

    setVM(vm: VirtualMachine) {
        this._vm = vm
        return this
    }

    abstract invoke(...args: IValue[]): IValue;
}

export class DeclarativeFunctionValue extends CallableValue {
    constructor(readonly decl: FunctionDeclaration) {
        super();
        this._isNull = false
    }

    invoke(...args: IValue[]): IValue {
        return this._vm.invoke(this._scope, this.decl, args);
    }

    toString(): string {
        return "DeclarativeFunctionValue";
    }
}

export abstract class BuiltinFunctionValue extends CallableValue {
    toString(): string {
        return "BuiltinFunctionValue";
    }
}

export class MethodValue extends CallableValue {
    constructor(private readonly clazz: ClassDeclaration, private readonly decl: FunctionDeclaration, private obj: ObjectValue) {
        super();
    }

    invoke(...args: IValue[]): IValue {
        this._scope.buildScope()
        const _s = new Scope()
        _s.add(new ISymbol('self', this.obj))
        const _r = this._vm.invoke(this._scope.derive(_s), this.decl, args)
        this._scope.popScope()
        return _r;
    }
}

export class DeclarativeClassValue extends ObjectValue {
    constructor(readonly decl: ClassDeclaration) {
        super();
        this._isNull = false
    }

    toString(): string {
        return "DeclarativeClassValue";
    }
}

export class DeclarativeObjectValue extends ObjectValue {
    constructor(readonly clazz: DeclarativeClassValue) {
        super();
        this._isNull = false
        for (const variable of clazz.decl.variables) {
            this.setProperty(variable.id.name, ValueSystem.buildNull())
        }
        for (const method of clazz.decl.methods) {
            this.setProperty(method.id.name, ValueSystem.buildMethod(clazz.decl, method, this));
        }
    }

    toString(): string {
        return this.clazz.decl.id.name + " " + super.toString();
    }
}

export class ValueSystem {
    static buildNull(): ObjectValue {
        return new ObjectValue()
    }

    static buildNumber(v: number): NumberValue {
        return new NumberValue(v)
    }

    static buildBoolean(v: boolean): BooleanValue {
        return new BooleanValue(v)
    }

    static buildString(v: string): StringValue {
        return new StringValue(v)
    }

    static buildDeclarativeFunction(decl: FunctionDeclaration): DeclarativeFunctionValue {
        return new DeclarativeFunctionValue(decl)
    }

    static buildMethod(clazz: ClassDeclaration, decl: FunctionDeclaration, obj: ObjectValue): MethodValue {
        return new MethodValue(clazz, decl, obj)
    }

    static buildDeclarativeClass(decl: ClassDeclaration): DeclarativeClassValue {
        return new DeclarativeClassValue(decl)
    }

    static buildDeclarativeObject(clazz: DeclarativeClassValue) {
        return new DeclarativeObjectValue(clazz)
    }

    static isTrue(v: IValue): boolean {
        if (v instanceof ObjectValue) return !v.isNull()
        if (v instanceof NumberValue) return v.value !== 0
        if (v instanceof BooleanValue) return v.value
        return false
    }
}
