// PSI: program structure interface

import {ParserRuleContext, ParseTree, TerminalNode} from "antlr4";

export class TextRange {
    line: number;

    start: number;

    end: number;
}

export class PsiElement {
    private _parent: PsiElement = null

    private _children: PsiElement[] = []

    private _textRange: TextRange = new TextRange()

    parent(): PsiElement { return this._parent }

    children(): PsiElement[] { return this._children }

    textRange(): TextRange { return this._textRange }

    mount(): void {}

    relate(p: PsiElement) {
        this._parent = p
        if (p._children.indexOf(p) === -1)
            p._children.push(this)
        return this
    }

    setTextRange(tree: ParseTree) {
        if (tree instanceof ParserRuleContext) {
            this._textRange.line = tree.start.line
            this._textRange.start = tree.start.start
            this._textRange.end = tree.stop.stop
        } else if (tree instanceof TerminalNode) {
            this._textRange.line = tree.symbol.line
            this._textRange.start = tree.symbol.start
            this._textRange.end = tree.symbol.stop
        }
        return this
    }

    dumps(): Record<string, any> { return {start: this._textRange.start, end: this._textRange.end} }

    toString(): string { return "" }

    static walk(el: PsiElement, onBefore: (e: PsiElement) => boolean, onAfter: (e: PsiElement) => void = null) {
        if (!el) return
        if (onBefore(el)) return
        for (const child of el.children()) {
            PsiElement.walk(child, onBefore, onAfter)
        }
        if (onAfter) onAfter(el)
    }
}

export class Program extends PsiElement {
    body: Declaration[] = [];
    dumps(): Record<string, any> {return {...super.dumps(), type: "Program", body: this.body.map(s => s?.dumps())};}
    mount() {
        this.body.forEach(decl => {
            decl?.relate(this)
            decl?.mount()
        })
    }
}

export abstract class Declaration extends PsiElement {}

export abstract class Statement extends PsiElement {}

export abstract class Expression extends PsiElement {}

export class ClassDeclaration extends Declaration {
    private _id: Identifier;
    variables: VariableDeclaration[] = [];
    methods: FunctionDeclaration[] = [];
    get id(): Identifier { return this._id }
    set id(id: Identifier) { this._id = id }
    dumps(): Record<string, any> {
        return {
            ...super.dumps(), type: "ClassDeclaration", id: this._id?.dumps(),
            variables: this.variables.map(v => v?.dumps()),
            methods: this.methods.map(m => m?.dumps())};
    }
    mount() {
        this._id?.relate(this); this._id?.mount()
        this.variables.forEach(variable => { variable?.relate(this); variable?.mount() })
        this.methods.forEach(method => { method?.relate(this); method?.mount() })
    }
}

export class FunctionDeclaration extends Declaration {
    private _id: Identifier;
    private _body: BlockStatement;
    params: Identifier[] = [];
    get id(): Identifier { return this._id }
    set id(id: Identifier) { this._id = id }
    get body(): BlockStatement { return this._body }
    set body(e: BlockStatement) { this._body = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "FunctionDeclaration", id: this._id?.dumps(), params: this.params.map(p => p?.dumps()), body: this._body?.dumps()};}
    mount() {
        this._id?.relate(this); this._id?.mount()
        this._body?.relate(this); this._body?.mount()
        this.params.forEach(param => { param?.relate(this); param?.mount() })
    }
}

export class VariableDeclaration extends Declaration {
    private _id: Identifier;
    private _init: Expression;
    private _kind: string;
    get kind(): string { return this._kind }
    set kind(k: string) { this._kind = k }
    get id(): Identifier { return this._id }
    set id(id: Identifier) { this._id = id }
    get init(): Expression { return this._init }
    set init(e: Expression) { this._init = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "VariableDeclaration", id: this._id?.dumps(), init: this._init?.dumps()};}
    mount() {
        this._id?.relate(this); this._id?.mount()
        this._init?.relate(this); this._init?.mount()
    }
}

export class BlockStatement extends Statement {
    body: Statement[] = [];
    dumps(): Record<string, any> {return {...super.dumps(), type: "BlockStatement", body: this.body.map(s => s?.dumps())};}
    mount() {this.body.forEach(stmt => { stmt?.relate(this); stmt?.mount() })}
}

export class IfStatement extends Statement {
    private _test: Expression;
    private _consequent: BlockStatement;
    private _alternate: IfStatement | BlockStatement;
    get test(): Expression { return this._test }
    set test(e: Expression) { this._test = e }
    get consequent(): BlockStatement { return this._consequent }
    set consequent(e: BlockStatement) { this._consequent = e }
    get alternate(): IfStatement | BlockStatement { return this._alternate }
    set alternate(e: IfStatement | BlockStatement) { this._alternate = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "IfStatement", test: this._test?.dumps(), consequent: this._consequent?.dumps(), alternate: this._alternate?.dumps()};}
    mount() {
        this._test?.relate(this); this._test?.mount()
        this._consequent?.relate(this); this._consequent?.mount()
        this._alternate?.relate(this); this._alternate?.mount()
    }
}

export class LoopStatement extends Statement {
}

export class ForStatement extends LoopStatement {
    private _init: Expression;
    private _test: Expression;
    private _update: Expression;
    private _body: BlockStatement;
    get init(): Expression { return this._init }
    set init(e: Expression) { this._init = e }
    get test(): Expression { return this._test }
    set test(e: Expression) { this._test = e }
    get update(): Expression { return this._update }
    set update(e: Expression) { this._update = e }
    get body(): BlockStatement { return this._body }
    set body(e: BlockStatement) { this._body = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "ForStatement", init: this._init?.dumps(), test: this._test?.dumps(), update: this._update?.dumps(), body: this._body?.dumps()};}
    mount() {
        this._init?.relate(this); this._init?.mount()
        this._test?.relate(this); this._test?.mount()
        this._update?.relate(this); this._update?.mount()
        this._body?.relate(this); this._body?.mount()
    }
}

export class ForeachStatement extends LoopStatement {
    private _left: Expression;
    private _right: Expression;
    private _body: BlockStatement;
    get left(): Expression { return this._left }
    set left(e: Expression) { this._left = e }
    get right(): Expression { return this._right }
    set right(e: Expression) { this._right = e }
    get body(): BlockStatement { return this._body }
    set body(e: BlockStatement) { this._body = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "ForeachStatement", left: this._left?.dumps(), right: this._right?.dumps(), body: this._body?.dumps()};}
    mount() {
        this._left?.relate(this); this._left?.mount()
        this._right?.relate(this); this._right?.mount()
        this._body?.relate(this); this._body?.mount()
    }
}

export class WhileStatement extends LoopStatement {
    private _test: Expression;
    private _body: BlockStatement;
    get test(): Expression { return this._test }
    set test(e: Expression) { this._test = e }
    get body(): BlockStatement { return this._body }
    set body(e: BlockStatement) { this._body = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "WhileStatement", test: this._test?.dumps(), body: this._body?.dumps()};}
    mount() {
        this._test?.relate(this); this._test?.mount()
        this._body?.relate(this); this._body?.mount()
    }
}

export class ReturnStatement extends Statement {
    private _argument: Expression;
    get argument(): Expression { return this._argument }
    set argument(e: Expression) { this._argument = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "ReturnStatement", argument: this._argument?.dumps()};}
    mount() {
        this._argument?.relate(this); this._argument?.mount()
    }
}

export class ContinueStatement extends Statement {
}

export class BreakStatement extends Statement {
}

export class BinaryExpression extends Expression {
    operator: string;
    private _left: Expression;
    get left(): Expression { return this._left }
    set left(e: Expression) { this._left = e }
    private _right: Expression;
    get right(): Expression { return this._right }
    set right(e: Expression) { this._right = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "BinaryExpression", operator: this.operator, left: this._left?.dumps(), right: this._right?.dumps()};}
    toString(): string { return `${this._left.toString()} ${this.operator} ${this._right.toString()}`}
    mount() {
        this._left?.relate(this); this._left?.mount()
        this._right?.relate(this); this._right?.mount()
    }
}

export class UnaryExpression extends Expression {
    prefix: boolean;
    operator: string;
    private _argument: Expression;
    get argument(): Expression { return this._argument }
    set argument(e: Expression) { this._argument = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "UnaryExpression", operator: this.operator, prefix: this.prefix, argument: this._argument?.dumps()};}
    toString(): string { return `${this.prefix ? `${this.operator} ` : ''}${this._argument.toString()}${!this.prefix ? ` ${this.operator}` : ''}`}
    mount() {
        this._argument?.relate(this); this._argument?.mount()
    }
}

export class NewExpression extends Expression {
    arguments: Expression[] = [];
    private _callee: Identifier;
    get callee(): Identifier { return this._callee }
    set callee(id: Identifier) {
        this._callee = id;
    }
    dumps(): Record<string, any> {return {...super.dumps(), type: "NewExpression", callee: this._callee?.dumps(), arguments: this.arguments.map(arg => arg?.dumps())};}
    toString(): string { return `new ${this._callee}`}
    mount() {
        this._callee?.relate(this); this._callee?.mount()
        for (let i = 0; i < this.arguments.length; i++) {
            const argument = this.arguments[i]
            argument?.relate(this); argument?.mount()
        }
    }
}

export class CallExpression extends Expression {
    arguments: Expression[] = [];
    private _callee: Expression;
    get callee(): Expression { return this._callee }
    set callee(e: Expression) { this._callee = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "CallExpression", callee: this._callee?.dumps(), arguments: this.arguments.map(arg => arg?.dumps())};}
    toString(): string {return `${this._callee?.toString()}(${this.arguments.map(arg => arg.toString()).join(', ')})`}
    mount() {
        this._callee?.relate(this); this._callee?.mount()
        for (let i = 0; i < this.arguments.length; i++) {
            const argument = this.arguments[i]
            argument?.relate(this); argument?.mount()
        }
    }
}

export class MemberExpression extends Expression {
    protected _object_: Expression;
    protected _property: Expression;
    get object_(): Expression { return this._object_ }
    set object_(e: Expression) { this._object_ = e }
    get property(): Expression { return this._property }
    set property(e: Expression) { this._property = e; }
    dumps(): Record<string, any> {return {...super.dumps(), type: "MemberExpression", "object": this._object_?.dumps(), property: this._property?.dumps()};}
    toString(): string {return `${this._object_.toString()}.${this._property.toString()}`}
    mount() {
        this._object_?.relate(this); this._object_?.mount()
        // this._property?.relate(this); this._property?.mount()
    }
}

export class DynamicMemberExpression extends Expression {
    protected _object_: Expression;
    protected _property: Expression;
    get object_(): Expression { return this._object_ }
    set object_(e: Expression) { this._object_ = e }
    get property(): Expression { return this._property }
    set property(e: Expression) { this._property = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "DynamicMemberExpression", "object": this._object_?.dumps(), property: this._property?.dumps()};}
    mount() {
        this._object_?.relate(this); this._object_?.mount()
        this._property?.relate(this); this._property?.mount()
    }
}

export class AssignmentExpression extends Expression {
    private _operator: string;
    private _left: Expression;
    private _right: Expression;
    get operator(): string { return this._operator }
    set operator(s: string) { this._operator = s }
    get left(): Expression { return this._left }
    set left(e: Expression) { this._left = e }
    get right(): Expression { return this._right }
    set right(e: Expression) { this._right = e }
    dumps(): Record<string, any> {return {...super.dumps(), type: "AssignmentExpression", operator: "=", left: this._left?.dumps(), right: this._right?.dumps()};}
    toString(): string {return `${this._left.toString()} = ${this._right.toString()}`}
    mount() {
        this._left?.relate(this); this._left?.mount()
        this._right?.relate(this); this._right?.mount()
    }
}

export class Identifier extends Expression {
    name: string;
    dumps(): Record<string, any> {return {...super.dumps(), type: "Identifier", name: this.name};}
    static build(name: string): Identifier {
        const r = new Identifier()
        r.name = name
        return r
    }
    toString(): string {return `${this.name}`}
}

export class Literal extends Expression {
    value: any;
    dumps(): Record<string, any> {return {...super.dumps(), type: "Literal", value: this.value};}
    static build(v: any): Literal {
        const r = new Literal()
        r.value = v instanceof Literal ? v.value : v
        return r
    }
    toString(): string {return `${this.value}`}
}
