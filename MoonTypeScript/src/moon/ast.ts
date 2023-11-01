import {
    CharStream,
    CommonTokenStream,
    ErrorListener,
    ParseTree,
    TerminalNode,
    Token,
} from 'antlr4';
import MoonLexer from '../parser/MoonLexer.js';
import MoonParser, {
    AccessExpressionContext,
    ArgumentsContext,
    BlockStatementContext,
    BreakStatementContext,
    ClassDeclarationContext,
    ContinueStatementContext, DeclarationsContext,
    ElseStatementContext,
    ExpressionContext,
    ForStatementContext,
    FunctionDeclarationContext,
    IfStatementContext,
    MemberContext,
    MembersContext,
    MultiIfStatementContext,
    ParamsContext, ProgramContext,
    ReturnStatementContext,
    StatementsContext,
    VariableDeclarationContext,
    WhileStatementContext
} from '../parser/MoonParser.js';
import {Recognizer} from "antlr4/src/antlr4/Recognizer";
import {RecognitionException} from "antlr4/src/antlr4/error/RecognitionException";
import {
    AssignmentExpression,
    BinaryExpression,
    BlockStatement,
    BreakStatement,
    CallExpression,
    ClassDeclaration,
    ContinueStatement,
    Declaration,
    DynamicMemberExpression,
    Expression,
    ForeachStatement,
    ForStatement,
    FunctionDeclaration,
    Identifier,
    IfStatement,
    Literal,
    LoopStatement,
    MemberExpression,
    NewExpression,
    Program,
    ReturnStatement,
    Statement,
    UnaryExpression,
    VariableDeclaration,
    WhileStatement
} from "./psi.js";

function extractString(text: string) {
    if (text[0] === '\'' && text[text.length - 1] === '\'') return text.substring(1, text.length - 1)
    else if (text[0] === '"' && text[text.length - 1] === '"') return text.substring(1, text.length - 1)
    else if (text.startsWith('r"') && text[text.length - 1] === '"') return text.substring(2, text.length - 1)
    else return ""
}

export class MoonLexerErrorListener extends ErrorListener<Token> {
    syntaxError(recognizer: Recognizer<Token>, offendingSymbol: Token, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
        throw new Error(`program:${line}:${column}: error: ${msg}`)
    }
}

// TODO:
// export class PsiAnalyzer {}
// export class PsiOptimizer {}

export class PsiBuilder {
    private _program: Program = null

    program() { return this._program }

    compile(input: string) {
        const chars = new CharStream(input);
        const lexer = new MoonLexer(chars);
        const tokens = new CommonTokenStream(lexer);
        const parser = new MoonParser(tokens);
        parser.removeErrorListeners()
        parser.addErrorListener(new MoonLexerErrorListener())
        this._program = this.handleProgram(parser.program())
        this._program.mount()
        return this
    }

    handleProgram(tree: ProgramContext): Program {
        const _r = new Program().setTextRange(tree)
        _r.body = this.unfoldDeclarations(tree.declarations())
        return _r
    }

    handleMember(tree: MemberContext): Declaration {
        if (tree.children[0] instanceof VariableDeclarationContext)
            return this.handleVariableDeclaration(tree.children[0])
        if (tree.children[0] instanceof FunctionDeclarationContext)
            return this.handleFunctionDeclaration(tree.children[0])
    }

    handleClassDeclaration(tree: ClassDeclarationContext): ClassDeclaration {
        const _r = new ClassDeclaration().setTextRange(tree)
        _r.id = this.handleIdentifier(tree.ID(0))
        this.unfoldMembers(tree.members()).forEach(decl => {
            if (decl instanceof VariableDeclaration) {
                _r.variables.push(decl)
            } else if (decl instanceof FunctionDeclaration) {
                _r.methods.push(decl)
            }
        })
        return _r;
    }

    handleVariableDeclaration(tree: VariableDeclarationContext): VariableDeclaration {
        const v = new VariableDeclaration().setTextRange(tree)
        // v.kind = tree.children[0].getText()
        v.id = this.handleIdentifier(tree.ID())
        v.init = this.handleExpression(tree.expression())
        return v
    }

    handleFunctionDeclaration(tree: FunctionDeclarationContext): FunctionDeclaration {
        const params = tree.params()
        const f = new FunctionDeclaration().setTextRange(tree)
        f.id = this.handleIdentifier(tree.children[1] as TerminalNode)
        f.params = (params !== null ? this.unfoldParams(params) : [])
        f.body = this.handleBlockStatement(tree.children[tree.children.length - 1] as BlockStatementContext)
        return f
    }

    handleStatements(tree: StatementsContext): Array<Statement> {
        return this.unfoldStatements(tree);
    }

    handleIfStatement(tree: IfStatementContext): IfStatement {
        const conditions =
            this.unfoldMultiIfStatement(tree.children[0] as MultiIfStatementContext)
        let index = 1
        let iter = conditions[0]
        while (index < conditions.length) {
            iter.alternate = conditions[index]
            iter = conditions[index]
            index++
        }
        const elseStatement = tree.children[1] as ElseStatementContext
        if (elseStatement && Array.isArray(elseStatement.children) && elseStatement.children.length > 0)
            conditions[conditions.length - 1].alternate =
                this.handleBlockStatement(elseStatement.children[1] as BlockStatementContext)
        return conditions[0]
    }

    handleForStatement(tree: ForStatementContext): LoopStatement {
        const semi = this.indexOfTerminals(tree.children, MoonLexer.SEMI)
        const isNumeric = semi.length > 0
        if (isNumeric) {
            const l = new ForStatement().setTextRange(tree)
            l.init = tree.children[semi[0] - 1] instanceof ExpressionContext
                ? this.handleExpression(tree.children[semi[0] - 1] as ExpressionContext) : null
            l.test = tree.children[semi[1] - 1] instanceof ExpressionContext
                ? this.handleExpression(tree.children[semi[1] - 1] as ExpressionContext) : null
            l.update = tree.children[semi[1] + 1] instanceof ExpressionContext
                ? this.handleExpression(tree.children[semi[1] + 1] as ExpressionContext) : null
            l.body = this.handleBlockStatement(tree.children[tree.children.length - 1] as BlockStatementContext)
            return l
        } else {
            const l = new ForeachStatement().setTextRange(tree)
            l.left  = this.handleExpression(tree.expression(0))
            l.right = this.handleExpression(tree.expression(1))
            l.body  = this.handleBlockStatement(tree.children[tree.children.length - 1] as BlockStatementContext)
            return l
        }
    }

    handleWhileStatement(tree: WhileStatementContext): WhileStatement {
        const w = new WhileStatement().setTextRange(tree)
        w.test = this.handleExpression(tree.children[2] as ExpressionContext)
        w.body = this.handleBlockStatement(tree.children[4] as BlockStatementContext)
        return w
    }

    handleReturnStatement(tree: ReturnStatementContext): ReturnStatement {
        const r = new ReturnStatement().setTextRange(tree)
        r.argument = tree.children.length === 2 ? this.handleExpression(tree.children[1] as ExpressionContext) : null
        return r
    }

    handleContinueStatement(tree: ContinueStatementContext): ContinueStatement {
        return new ContinueStatement().setTextRange(tree)
    }

    handleBreakStatement(tree: BreakStatementContext): BreakStatement {
        return new BreakStatement().setTextRange(tree)
    }

    handleBlockStatement(tree: BlockStatementContext): BlockStatement {
        const b = new BlockStatement().setTextRange(tree)
        b.body = tree.children.length === 3 ? this.handleStatements(tree.children[1] as StatementsContext) : []
        return b
    }

    handleExpression(tree: ExpressionContext): Expression {
        if (tree.children[0] instanceof TerminalNode && tree.children[0].getText() === '(') {
            let obj: Expression = this.handleExpression(tree.children[1] as ExpressionContext)
            const last = tree.children[tree.children.length - 1] as any
            if (last.ruleIndex && last.ruleIndex === MoonParser.RULE_accessExpression) {
                obj = this.handleAccessExpression(obj, last)
            }
            return obj
        }
        if (tree.children[0] instanceof TerminalNode && tree.children[0].getText() === 'new') {
            let obj = this.handleNewExpression(tree)//(tree.children[1] as TerminalNode, [])
            const last = tree.children[tree.children.length - 1] as any
            if (last.ruleIndex && last.ruleIndex === MoonParser.RULE_accessExpression) {
                obj = this.handleAccessExpression(obj, last)
            }
            return obj
        }
        if (tree.children[0] instanceof TerminalNode && tree.children[0].symbol.type === MoonLexer.ID) {
            let obj = this.handleIdentifier(tree.children[0])
            const last = tree.children[tree.children.length - 1] as any
            if (last.ruleIndex && last.ruleIndex === MoonParser.RULE_accessExpression) {
                obj = this.handleAccessExpression(obj, last)
            }
            return obj
        }
        if (tree.children.length === 1) { return this.handleTerminal(tree.children[0] as TerminalNode) }
        if (tree.children.length === 2
            && tree.children[0] instanceof TerminalNode
            && tree.children[1] instanceof ExpressionContext) {
            return this.handleUnaryExpression(tree)
        }
        if (tree.children.length === 2
            && tree.children[0] instanceof ExpressionContext
            && tree.children[1] instanceof TerminalNode) {
            return this.handleUnaryExpression(tree)
        }
        if (tree.children.length === 3
            && tree.children[0] instanceof ExpressionContext
            && tree.children[1] instanceof TerminalNode
            && tree.children[2] instanceof ExpressionContext
        ) {
            return tree.children[1].getText() === '='
                ? this.handleAssignmentExpression(tree)
                : this.handleBinaryExpression(tree)
        }
        return null
    }

    handleAccessExpression(obj, tree: AccessExpressionContext) {
        const seq = this.unfoldAccessExpression(tree)
        if (seq.length === 0) return obj
        let index: number
        let iObj = obj
        if (obj instanceof NewExpression && seq[0] instanceof CallExpression) {
            obj.arguments = seq[0].arguments
            index = 1
        } else {
            index = 0;
        }
        while (index < seq.length) {
            if (seq[index] instanceof CallExpression) {
                (seq[index] as CallExpression).callee = iObj
            } else {
                (seq[index] as MemberExpression).object_ = iObj
            }
            iObj = seq[index]
            index++
        }
        return iObj
    }

    handleMemberExpression(tree: AccessExpressionContext) {
        const call = new MemberExpression().setTextRange(tree)
        call.object_ = null
        call.property = this.handleIdentifier(tree.ID())
        return call
    }

    handleDynamicMemberExpression(tree: AccessExpressionContext) {
        const call = new DynamicMemberExpression().setTextRange(tree)
        call.object_ = null
        call.property = this.handleExpression(tree.expression())
        return call
    }

    handleCallExpression(tree: AccessExpressionContext) {
        const call = new CallExpression().setTextRange(tree)
        call.callee = null
        call.arguments = this.unfoldArguments(tree.arguments())
        return call
    }

    handleNewExpression(tree: ExpressionContext) {
        const newObj = new NewExpression()
        newObj.callee = this.handleIdentifier(tree.ID())
        return newObj
    }

    handleAssignmentExpression(tree: ExpressionContext) {
        const assignment = new AssignmentExpression().setTextRange(tree)
        assignment.operator = tree.children[1].getText()
        assignment.left  = this.handleExpression(tree.children[0] as ExpressionContext)
        assignment.right = this.handleExpression(tree.children[2] as ExpressionContext)
        return assignment
    }

    handleBinaryExpression(tree: ExpressionContext) {
        const binary = new BinaryExpression().setTextRange(tree)
        binary.operator = tree.children[1].getText()
        binary.left  = this.handleExpression(tree.children[0] as ExpressionContext)
        binary.right = this.handleExpression(tree.children[2] as ExpressionContext)
        return binary
    }

    handleUnaryExpression(tree: ExpressionContext) {
        let operator: string;
        let argument: ExpressionContext;
        let prefix: boolean = true
        if (tree.children[0] instanceof TerminalNode) {
            operator = tree.children[0].getText()
            argument = tree.children[1] as ExpressionContext
        } else {
            argument = tree.children[0] as ExpressionContext
            operator = tree.children[1].getText()
            prefix = false
        }
        const unary = new UnaryExpression().setTextRange(tree)
        unary.operator = operator
        unary.argument = this.handleExpression(argument)
        unary.prefix = prefix
        return unary
    }

    handleIdentifier(tree: TerminalNode) {
        return Identifier.build(tree.getText()).setTextRange(tree)
    }

    handleTerminal(tree: TerminalNode): Identifier | Literal {
        let _r = null;
        if (tree.symbol.type === MoonLexer.ID)
            _r = Identifier.build(tree.getText())
        else if (tree.symbol.type === MoonLexer.NUMBER)
            _r = Literal.build(parseFloat(tree.getText()))
        else if (tree.symbol.type === MoonLexer.HEX)
            _r = Literal.build(parseInt(tree.getText(), 16))
        else if (tree.symbol.type === MoonLexer.OCT)
            _r = Literal.build(parseInt(tree.getText(), 8))
        else if (tree.symbol.type === MoonLexer.BIN)
            _r = Literal.build(parseInt(tree.getText(), 2))
        else if (tree.symbol.type === MoonLexer.STRING)
            _r = Literal.build(extractString(tree.getText()))
        else if (tree.getText() === 'true')
            _r = Literal.build(true)
        else if (tree.getText() === 'false')
            _r = Literal.build(false)
        _r?.setTextRange(tree)
        return _r
    }

    private indexOfTerminals(children: Array<ParseTree>, term: number): number[] {
        const r: Array<number> = []
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            if (child instanceof TerminalNode && child.symbol.type === term)
                r.push(i)
        }
        return r
    }

    private unfoldDeclarations(tree: DeclarationsContext): Declaration[] {
        if (tree.declarations_list().length) {
            let _r: Declaration[] = []
            for (const decls of tree.declarations_list()) {
                _r = [..._r, ...this.unfoldDeclarations(decls)]
            }
            return _r;
        }
        if (tree.classDeclaration())
            return [this.handleClassDeclaration(tree.classDeclaration())]
        if (tree.functionDeclaration())
            return [this.handleFunctionDeclaration(tree.functionDeclaration())]
        return [this.handleVariableDeclaration(tree.variableDeclaration())];
    }

    private unfoldMembers(tree: MembersContext): Array<Declaration> {
        if (tree === null) return []
        if (tree.children.length === 1) return [this.handleMember(tree.children[0] as MemberContext)]
        let r: Array<Declaration> = []
        for (const child of tree.children) {
            r = r.concat(this.unfoldMembers(child as MembersContext))
        }
        return r
    }

    private unfoldParams(tree: ParamsContext): Array<Identifier> {
        if (tree.children.length === 1)
            return [this.handleIdentifier(tree.children[0] as TerminalNode)]
        return [
            ...this.unfoldParams(tree.children[0] as ParamsContext),
            ...this.unfoldParams(tree.children[2] as ParamsContext)
        ]
    }

    private unfoldAccessExpression(tree: AccessExpressionContext): Array<Expression> {
        const first = tree.children[0]
        if (first instanceof TerminalNode) {
            if (first.getText() === '.') {
                return [this.handleMemberExpression(tree)]
            }
            if (first.getText() === '[') {
                return [this.handleDynamicMemberExpression(tree)]
            }
            if (first.getText() === '(') {
                return [this.handleCallExpression(tree)]
            }
            return []
        }
        return [
            ...this.unfoldAccessExpression(tree.children[0] as AccessExpressionContext),
            ...this.unfoldAccessExpression(tree.children[1] as AccessExpressionContext)
        ]
    }

    private unfoldArguments(tree: ArgumentsContext): Array<Expression> {
        if (tree === null) return []
        if (tree.children.length === 1) return [this.handleExpression(tree.children[0] as ExpressionContext)]
        return [
            ...this.unfoldArguments(tree.children[0] as ArgumentsContext),
            ...this.unfoldArguments(tree.children[2] as ArgumentsContext)
        ]
    }

    private unfoldStatements(tree: StatementsContext): Array<Statement> {
        const first = tree.children[0]
        if (!(first instanceof StatementsContext)) {
            if (first instanceof IfStatementContext)
                return [this.handleIfStatement(first)]
            if (first instanceof ForStatementContext)
                return [this.handleForStatement(first)]
            if (first instanceof WhileStatementContext)
                return [this.handleWhileStatement(first)]
            if (first instanceof ReturnStatementContext)
                return [this.handleReturnStatement(first)]
            if (first instanceof ContinueStatementContext)
                return [this.handleContinueStatement(first)]
            if (first instanceof BreakStatementContext)
                return [this.handleBreakStatement(first)]
            if (first instanceof BlockStatementContext)
                return [this.handleBlockStatement(first)]
            if (first instanceof ExpressionContext)
                return [this.handleExpression(first)]
            return []
        }
        return [...this.unfoldStatements(first), ...this.unfoldStatements(tree.children[1] as StatementsContext)]
    }

    private unfoldMultiIfStatement(tree: MultiIfStatementContext): Array<IfStatement> {
        const first = tree.children[0]
        if (!(first instanceof MultiIfStatementContext)) {
            const r = new IfStatement().setTextRange(tree)
            r.test = this.handleExpression(tree.children[2] as ExpressionContext)
            r.consequent = this.handleBlockStatement(tree.children[4] as BlockStatementContext)
            r.alternate = null
            return [r]
        }
        return [
            ...this.unfoldMultiIfStatement(first),
            ...this.unfoldMultiIfStatement(tree.children[2] as MultiIfStatementContext)
        ]
    }
}

