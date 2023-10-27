// evaluator version 2.0

import {
    AssignmentExpression,
    BinaryExpression,
    CallExpression, DynamicMemberExpression,
    Expression, Identifier, Literal,
    MemberExpression,
    NewExpression,
    PsiElement,
    UnaryExpression
} from "./psi.js";
import {
    ArrayValue,
    BooleanValue,
    CallableValue, DeclarativeClassValue,
    IValue,
    NumberValue,
    ObjectValue, Ref,
    StringValue,
    ValueSystem
} from "./valuesystem.js";
import {ISymbol, ScopeProvider} from "./scope.js";
import {VirtualMachine} from "./vm.js";
import {handle} from "./hdl.js";

function uuid() {
    const t = new Date().getTime().toString(16)
    return new Array(32).fill(0).map((_, i) =>
        i % 2 === 0 && i / 2 < t.length ? t[i / 2] : Math.floor(Math.random() * 16).toString(16)).reverse().join('')
}

export class Evaluator {
    constructor(private scope: ScopeProvider, private vm: VirtualMachine) {

    }

    /**
     * @notice Keep the below!!! DO NOT remove the 'debug' log!
     * @todo: The next release will be a major refactoring.
     *        The current evaluation is not compatible with underlying system.
     *        The high-level evaluation will replaced by bytecode!
     */
    private _hdReq: string[] = []
    private _hdBtc: Map<string, string[]> = new Map
    private iCurReq() { return this._hdReq[this._hdReq.length - 1] }
    private iBtcRec(cmd: string) { this._hdBtc.get(this.iCurReq()).push(cmd) }

    evaluate(exp: Expression): IValue {
        // // console.debug(exp)
        const bytecodes: string[] = []
        const valueStack: IValue[] = []
        let _bp: number = 0, _sp: number = 0
        const _uuid = uuid().substring(0, 6)
        this._hdReq.push(_uuid)
        this._hdBtc.set(_uuid, bytecodes)
        const prepare_stack = () => {
            bytecodes.push(`StkClear`)
            // console.debug(`${_uuid} Stack [CLEAR] sp : ${_sp}`)
            // console.debug(`${_uuid} Stack ${exp.toString()}`)
        }
        const push_stack = (storage: IValue) => {
            bytecodes.push(`StkPush ${storage ? storage.constructor.name : "null"}`)
            valueStack.push(storage)
            _sp++
            // console.debug(`${_uuid} Stack [ PUSH] sp : ${_sp},`, valueStack)
        }
        const pop_stack = (n: number = 1) => {
            bytecodes.push(`StkPop ${n}`)
            let _r: IValue[] = []
            if (n <= 0) return _r
            if (n === 1) {
                _r.push(valueStack.pop())
                _sp--
            } else {
                _r = valueStack.splice(valueStack.length - n, n)
                _sp = _sp - n;
                // console.debug(`${_uuid} Stack [  POP] sp : ${_sp},`, valueStack)
            }
            return _r;
        }
        const popout_stack = () => {
            bytecodes.push(`StkPopout`)
            // console.debug(`${_uuid} Stack [  OUT] sp : ${_sp}, size : ${valueStack.length},`, valueStack)
            // console.debug(`${_uuid} Stack ${exp.toString()}`)
            return valueStack[valueStack.length - 1]
        }
        prepare_stack()
        // const checkpoints: Set<PsiElement> = new Set
        PsiElement.walk(exp, (el: Expression) => {
            // if (checkpoints.has(el)) {
            //     console.warn(`[LANG] checkpoint exception`)
            //     return true
            // }
            // checkpoints.add(el)
            if (el instanceof AssignmentExpression && el.left instanceof Identifier) {
                if (!this.scope.contains(el.left.name))
                    this.scope.scan(new ISymbol(el.left.name, ValueSystem.buildNull()))
            }
            if (el instanceof Literal) {
                push_stack(this.handleLiteral(el))
                return true
            }
            if (el instanceof Identifier) {
                push_stack(this.handleIdentifier(el))
                return true
            }
            return false
        }, (el: Expression) => {
            // // console.debug(valueStack)
            if (el instanceof DynamicMemberExpression) {
                const [obj, arg] = pop_stack(2)
                push_stack(this.handleDynamicMember(el as DynamicMemberExpression, obj, arg))
                return
            }
            if (el instanceof MemberExpression) {
                push_stack(this.handleMember(el as MemberExpression, pop_stack()[0]))
                return
            }
            if (el instanceof NewExpression) {
                push_stack(this.handleNew(el as NewExpression, pop_stack()[0]))
                return
            }
            if (el instanceof AssignmentExpression) {
                const [target, value] = pop_stack(2)
                push_stack(this.handleAssign(el as AssignmentExpression, target, value))
                return
            }
            if (el instanceof UnaryExpression) {
                push_stack(this.handleUnary(el as UnaryExpression, pop_stack()[0]))
                return
            }
            if (el instanceof BinaryExpression) {
                const [left, right] = pop_stack(2)
                push_stack(this.handleBinary(el as BinaryExpression, left, right))
                return
            }
            if (el instanceof CallExpression) {
                const nArgs = el.arguments.length
                const [callee, ...args] = pop_stack(nArgs + 1)
                push_stack(this.handleCall(el, callee, ...args))
                return
            }
        })
        const _r = popout_stack()
        // console.debug(bytecodes)
        this._hdBtc.delete(_uuid)
        this._hdReq.pop()
        // // console.debug(`[LANG] EVAL ${exp.toString()} => ${valueStack[valueStack.length - 1]}`)
        // return valueStack[valueStack.length - 1] // valueStack.pop()
        return _r // valueStack[valueStack.length - 1] // valueStack.pop()
    }

    private handleLiteral(exp: Literal): IValue {
        return handle<IValue>([
            {match: () => (typeof exp.value === 'number'), apply: () => ValueSystem.buildNumber(exp.value)},
            {match: () => (typeof exp.value === 'boolean'), apply: () => ValueSystem.buildBoolean(exp.value)},
            {match: () => (typeof exp.value === 'string'), apply: () => ValueSystem.buildString(exp.value)},
            {match: () => true, apply: () => ValueSystem.buildNull()},
        ])
    }

    private handleIdentifier(exp: Identifier): IValue {
        if (!this.scope.contains(exp.name))
            throw new Error(`error:${exp.textRange().line}: no such identifier : ${exp.name}`)
        return this.scope.get(exp.name).value
    }

    private handleAssign(exp: AssignmentExpression, target: IValue, value: IValue): IValue {
        this.iBtcRec(`assign`)
        if (exp.left instanceof Identifier) {
            const identifier = exp.left
            let symbol = this.scope.get(identifier.name)
            // if (!symbol)
            //     symbol = new ISymbol(identifier.name, value)
            symbol.value = value
            this.scope.scan(symbol)
            return value
        }
        if (!target.hasRef())
            throw new Error(`error: ${exp.left.toString()} not assignable`)
        target.getRef().setValue(value)
        return value
    }

    private handleCall(exp: CallExpression, callee: IValue, ...args: IValue[]): IValue {
        this.iBtcRec(`call`)
        // // console.debug(callee)
        if (!(callee instanceof CallableValue))
            throw new Error(`error: ${callee.toString()} not callable`)
        // // console.debug(`[LANG] args : ${args.map(arg => arg.toString()).join(", ")} `)
        // // console.debug(`[LANG] callee :`, callee)
        return callee.setScope(this.scope).setVM(this.vm).invoke(...args)
    }

    private handleDynamicMember(exp: DynamicMemberExpression, obj: IValue, property: IValue): IValue {
        this.iBtcRec(`access(dynamic)`)
        if (!(obj instanceof ObjectValue))
            throw new Error(`error: invalid member access : ${property}`)
        if (obj.isNull())
            throw new Error(`error: null exception when access : ${property}`)
        if (property instanceof NumberValue && obj instanceof ArrayValue) {
            const _r = obj.getItem(property.value)
            _r.setRef(Ref.refArray(obj, property.value))
            return _r
        }
        if (property instanceof StringValue && obj instanceof ObjectValue) {
            if (!obj.contains(property.value))
                throw new Error(`error: no such property : ${property.value}`)
            const _r = obj.getProperty(property.value)
            _r.setRef(Ref.refObject(obj, property.value))
            return _r
        }
        throw new Error(`error: invalid member access : ${property.toString()}`)
    }

    private handleMember(exp: MemberExpression, obj: IValue): IValue {
        this.iBtcRec(`access(member)`)
        if (!(exp.property instanceof Identifier))
            throw new Error(`error: invalid member access`)
        const property = exp.property
        if (!(obj instanceof ObjectValue))
            throw new Error(`error: invalid member access : ${property}`)
        if (obj.isNull())
            throw new Error(`error: null exception when access : ${property}`)
        if (!obj.contains(property.name))
            throw new Error(`error: no such property : ${property}`)
        const _r = obj.getProperty(property.name)
        _r.setRef(Ref.refObject(obj, property.name))
        return _r
    }

    private handleNew(exp: NewExpression, callee: IValue, ...args: IValue[]): ObjectValue {
        this.iBtcRec(`new`)
        const cls = exp.callee
        const symbol = this.scope.get(cls.name)
        if (!symbol)
            throw new Error(`error: no such class ${cls}`);
        if (!(symbol.value instanceof DeclarativeClassValue))
            throw new Error(`error: ${cls.name} not class type`)
        return ValueSystem.buildDeclarativeObject(symbol.value);
    }

    private handleUnary(exp: UnaryExpression, arg: IValue): IValue {
        const op = exp.operator
        this.iBtcRec(`unary(${op})`)
        return handle<IValue>([
            {match: () => op === '!' && arg instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean(! (arg as NumberValue).value)},
            {match: () => op === '!' && arg instanceof BooleanValue,
                apply: () => ValueSystem.buildBoolean(! (arg as BooleanValue).value)},
            {match: () => op === '!' && arg instanceof ObjectValue,
                apply: () => ValueSystem.buildBoolean((arg as ObjectValue).isNull())},
            {match: () => op === '~' && arg instanceof NumberValue,
                apply: () => ValueSystem.buildNumber(~ (arg as NumberValue).value)},
            {match: () => op === '+' && arg instanceof NumberValue,
                apply: () => arg},
            {match: () => op === '-' && arg instanceof NumberValue,
                apply: () => ValueSystem.buildNumber(- (arg as NumberValue).value)},
            {match: () => true,
                apply: () => { throw new Error(`error: invalid unary operation : ${op}, argument : ${arg.toString()}`) }},
        ])
    }

    private handleBinary(exp: BinaryExpression, left: IValue, right: IValue): IValue {
        const op = exp.operator
        this.iBtcRec(`binary(${op})`)
        return handle<IValue>([
            { match: () => op === '+' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value + (right as NumberValue).value) },
            { match: () => op === '+' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildString((left as StringValue).value + (right as StringValue).value) },
            { match: () => op === '-' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value - (right as NumberValue).value) },
            { match: () => op === '*' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value * (right as NumberValue).value) },
            { match: () => op === '/' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value / (right as NumberValue).value) },
            { match: () => op === '%' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value % (right as NumberValue).value) },
            { match: () => op === '^' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value ^ (right as NumberValue).value) },
            { match: () => op === '|' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value | (right as NumberValue).value) },
            { match: () => op === '&' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value & (right as NumberValue).value) },

            { match: () => op === '>' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value > (right as NumberValue).value) },
            { match: () => op === '>=' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value >= (right as NumberValue).value) },
            { match: () => op === '<' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value < (right as NumberValue).value) },
            { match: () => op === '<=' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value <= (right as NumberValue).value) },
            { match: () => op === '==' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value === (right as NumberValue).value) },
            { match: () => op === '!=' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value !== (right as NumberValue).value) },

            { match: () => op === '>' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value > (right as StringValue).value) },
            { match: () => op === '>=' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value >= (right as StringValue).value) },
            { match: () => op === '<' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value < (right as StringValue).value) },
            { match: () => op === '<=' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value <= (right as StringValue).value) },
            { match: () => op === '==' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value === (right as StringValue).value) },
            { match: () => op === '!=' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value !== (right as StringValue).value) },

            { match: () => op === '==' && left instanceof BooleanValue && right instanceof BooleanValue,
                apply: () => ValueSystem.buildBoolean((left as BooleanValue).value === (right as BooleanValue).value) },
            { match: () => op === '!=' && left instanceof BooleanValue && right instanceof BooleanValue,
                apply: () => ValueSystem.buildBoolean((left as BooleanValue).value !== (right as BooleanValue).value) },

            { match: () => op === '==' && left instanceof ObjectValue && right instanceof ObjectValue,
                apply: () => ValueSystem.buildBoolean((left as ObjectValue) === (right as ObjectValue)) },
            { match: () => op === '!=' && left instanceof ObjectValue && right instanceof ObjectValue,
                apply: () => ValueSystem.buildBoolean((left as ObjectValue) !== (right as ObjectValue)) },

            {match: () => true,
                apply: () => { throw new Error(`error: invalid binary operation : ${op}, left : ${left.toString()}, right : ${right.toString()}`) }},
        ])
    }
}

