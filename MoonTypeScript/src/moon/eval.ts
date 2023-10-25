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

export class Evaluator {
    constructor(private scope: ScopeProvider, private vm: VirtualMachine) {

    }

    evaluate(exp: Expression): IValue {
        // console.debug(exp)
        const valueStack: IValue[] = []
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
                valueStack.push(this.handleLiteral(el))
                return true
            }
            if (el instanceof Identifier) {
                valueStack.push(this.handleIdentifier(el))
                return true
            }
            return false
        }, (el: Expression) => {
            // console.info(valueStack)
            if (el instanceof DynamicMemberExpression) {
                const [obj, arg] = valueStack.splice(valueStack.length - 2, 2)
                valueStack.push(this.handleDynamicMember(el as DynamicMemberExpression, obj, arg))
                return
            }
            if (el instanceof MemberExpression) {
                valueStack.push(this.handleMember(el as MemberExpression, valueStack.pop()))
                return
            }
            if (el instanceof NewExpression) {
                valueStack.push(this.handleNew(el as NewExpression))
                return
            }
            if (el instanceof AssignmentExpression) {
                const [target, value] = valueStack.splice(valueStack.length - 2, 2)
                valueStack.push(this.handleAssign(el as AssignmentExpression, target, value))
                return
            }
            if (el instanceof UnaryExpression) {
                valueStack.push(this.handleUnary(el as UnaryExpression, valueStack.pop()))
                return
            }
            if (el instanceof BinaryExpression) {
                const [left, right] = valueStack.splice(valueStack.length - 2, 2);
                valueStack.push(this.handleBinary(el as BinaryExpression, left, right))
                return
            }
            if (el instanceof CallExpression) {
                const nArgs = el.arguments.length
                const [callee, ...args] = valueStack.splice(valueStack.length - (nArgs + 1), nArgs + 1)
                valueStack.push(this.handleCall(el, callee, ...args))
                return
            }
        })
        // console.debug(`[LANG] EVAL ${exp.toString()} => ${valueStack[valueStack.length - 1]}`)
        return valueStack[valueStack.length - 1] // valueStack.pop()
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
        // console.info(callee)
        if (!(callee instanceof CallableValue))
            throw new Error(`error: ${callee.toString()} not callable`)
        // console.debug(`[LANG] args : ${args.map(arg => arg.toString()).join(", ")} `)
        // console.debug(`[LANG] callee :`, callee)
        return callee.setScope(this.scope).setVM(this.vm).invoke(...args)
    }

    private handleDynamicMember(exp: DynamicMemberExpression, obj: IValue, property: IValue): IValue {
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

    private handleNew(exp: NewExpression, ...args: IValue[]): ObjectValue {
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

