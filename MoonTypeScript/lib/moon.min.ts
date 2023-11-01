import {
    ATN, ATNDeserializer, CharStream, DecisionState, DFA, FailedPredicateException, RecognitionException,
    NoViableAltException, Parser, ParserATNSimulator, ParserRuleContext, ParseTree, Recognizer, PredictionContextCache,
    TerminalNode, Token, TokenStream, Lexer, LexerATNSimulator, RuleContext, ParseTreeListener, ParseTreeVisitor,
    CommonTokenStream, ErrorListener,
} from "antlr4";

/**
 * This interface defines a complete listener for a parse tree produced by
 * `MoonParser`.
 */
export class MoonListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by `MoonParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.declarations`.
     * @param ctx the parse tree
     */
    enterDeclarations?: (ctx: DeclarationsContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.declarations`.
     * @param ctx the parse tree
     */
    exitDeclarations?: (ctx: DeclarationsContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.classDeclaration`.
     * @param ctx the parse tree
     */
    enterClassDeclaration?: (ctx: ClassDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.classDeclaration`.
     * @param ctx the parse tree
     */
    exitClassDeclaration?: (ctx: ClassDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.members`.
     * @param ctx the parse tree
     */
    enterMembers?: (ctx: MembersContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.members`.
     * @param ctx the parse tree
     */
    exitMembers?: (ctx: MembersContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.member`.
     * @param ctx the parse tree
     */
    enterMember?: (ctx: MemberContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.member`.
     * @param ctx the parse tree
     */
    exitMember?: (ctx: MemberContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.variableDeclaration`.
     * @param ctx the parse tree
     */
    enterVariableDeclaration?: (ctx: VariableDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.variableDeclaration`.
     * @param ctx the parse tree
     */
    exitVariableDeclaration?: (ctx: VariableDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.functionDeclaration`.
     * @param ctx the parse tree
     */
    enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.functionDeclaration`.
     * @param ctx the parse tree
     */
    exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.params`.
     * @param ctx the parse tree
     */
    enterParams?: (ctx: ParamsContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.params`.
     * @param ctx the parse tree
     */
    exitParams?: (ctx: ParamsContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.statements`.
     * @param ctx the parse tree
     */
    enterStatements?: (ctx: StatementsContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.statements`.
     * @param ctx the parse tree
     */
    exitStatements?: (ctx: StatementsContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.blockStatement`.
     * @param ctx the parse tree
     */
    enterBlockStatement?: (ctx: BlockStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.blockStatement`.
     * @param ctx the parse tree
     */
    exitBlockStatement?: (ctx: BlockStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.tryStatement`.
     * @param ctx the parse tree
     */
    enterTryStatement?: (ctx: TryStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.tryStatement`.
     * @param ctx the parse tree
     */
    exitTryStatement?: (ctx: TryStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.catchClause`.
     * @param ctx the parse tree
     */
    enterCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.catchClause`.
     * @param ctx the parse tree
     */
    exitCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.finallyClause`.
     * @param ctx the parse tree
     */
    enterFinallyClause?: (ctx: FinallyClauseContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.finallyClause`.
     * @param ctx the parse tree
     */
    exitFinallyClause?: (ctx: FinallyClauseContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.throwStatement`.
     * @param ctx the parse tree
     */
    enterThrowStatement?: (ctx: ThrowStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.throwStatement`.
     * @param ctx the parse tree
     */
    exitThrowStatement?: (ctx: ThrowStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.ifStatement`.
     * @param ctx the parse tree
     */
    enterIfStatement?: (ctx: IfStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.ifStatement`.
     * @param ctx the parse tree
     */
    exitIfStatement?: (ctx: IfStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.multiIfStatement`.
     * @param ctx the parse tree
     */
    enterMultiIfStatement?: (ctx: MultiIfStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.multiIfStatement`.
     * @param ctx the parse tree
     */
    exitMultiIfStatement?: (ctx: MultiIfStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.elseStatement`.
     * @param ctx the parse tree
     */
    enterElseStatement?: (ctx: ElseStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.elseStatement`.
     * @param ctx the parse tree
     */
    exitElseStatement?: (ctx: ElseStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.forStatement`.
     * @param ctx the parse tree
     */
    enterForStatement?: (ctx: ForStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.forStatement`.
     * @param ctx the parse tree
     */
    exitForStatement?: (ctx: ForStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.whileStatement`.
     * @param ctx the parse tree
     */
    enterWhileStatement?: (ctx: WhileStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.whileStatement`.
     * @param ctx the parse tree
     */
    exitWhileStatement?: (ctx: WhileStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.returnStatement`.
     * @param ctx the parse tree
     */
    enterReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.returnStatement`.
     * @param ctx the parse tree
     */
    exitReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.continueStatement`.
     * @param ctx the parse tree
     */
    enterContinueStatement?: (ctx: ContinueStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.continueStatement`.
     * @param ctx the parse tree
     */
    exitContinueStatement?: (ctx: ContinueStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.breakStatement`.
     * @param ctx the parse tree
     */
    enterBreakStatement?: (ctx: BreakStatementContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.breakStatement`.
     * @param ctx the parse tree
     */
    exitBreakStatement?: (ctx: BreakStatementContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.accessExpression`.
     * @param ctx the parse tree
     */
    enterAccessExpression?: (ctx: AccessExpressionContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.accessExpression`.
     * @param ctx the parse tree
     */
    exitAccessExpression?: (ctx: AccessExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MoonParser.arguments`.
     * @param ctx the parse tree
     */
    enterArguments?: (ctx: ArgumentsContext) => void;
    /**
     * Exit a parse tree produced by `MoonParser.arguments`.
     * @param ctx the parse tree
     */
    exitArguments?: (ctx: ArgumentsContext) => void;
}

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `MoonParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class MoonVisitor<Result> extends ParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `MoonParser.program`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProgram?: (ctx: ProgramContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.declarations`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeclarations?: (ctx: DeclarationsContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.classDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitClassDeclaration?: (ctx: ClassDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.members`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMembers?: (ctx: MembersContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.member`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMember?: (ctx: MemberContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.variableDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableDeclaration?: (ctx: VariableDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.functionDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.params`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParams?: (ctx: ParamsContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.statements`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStatements?: (ctx: StatementsContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.blockStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlockStatement?: (ctx: BlockStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.tryStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTryStatement?: (ctx: TryStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.catchClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCatchClause?: (ctx: CatchClauseContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.finallyClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFinallyClause?: (ctx: FinallyClauseContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.throwStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitThrowStatement?: (ctx: ThrowStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.ifStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfStatement?: (ctx: IfStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.multiIfStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultiIfStatement?: (ctx: MultiIfStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.elseStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElseStatement?: (ctx: ElseStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.forStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitForStatement?: (ctx: ForStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.whileStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhileStatement?: (ctx: WhileStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.returnStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnStatement?: (ctx: ReturnStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.continueStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContinueStatement?: (ctx: ContinueStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.breakStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBreakStatement?: (ctx: BreakStatementContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.accessExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAccessExpression?: (ctx: AccessExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `MoonParser.arguments`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArguments?: (ctx: ArgumentsContext) => Result;
}


export class MoonLexer extends Lexer {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly T__17 = 18;
    public static readonly T__18 = 19;
    public static readonly T__19 = 20;
    public static readonly T__20 = 21;
    public static readonly T__21 = 22;
    public static readonly T__22 = 23;
    public static readonly T__23 = 24;
    public static readonly T__24 = 25;
    public static readonly T__25 = 26;
    public static readonly T__26 = 27;
    public static readonly T__27 = 28;
    public static readonly T__28 = 29;
    public static readonly T__29 = 30;
    public static readonly T__30 = 31;
    public static readonly T__31 = 32;
    public static readonly T__32 = 33;
    public static readonly T__33 = 34;
    public static readonly T__34 = 35;
    public static readonly T__35 = 36;
    public static readonly T__36 = 37;
    public static readonly T__37 = 38;
    public static readonly T__38 = 39;
    public static readonly T__39 = 40;
    public static readonly T__40 = 41;
    public static readonly T__41 = 42;
    public static readonly T__42 = 43;
    public static readonly T__43 = 44;
    public static readonly T__44 = 45;
    public static readonly T__45 = 46;
    public static readonly T__46 = 47;
    public static readonly T__47 = 48;
    public static readonly T__48 = 49;
    public static readonly T__49 = 50;
    public static readonly T__50 = 51;
    public static readonly T__51 = 52;
    public static readonly T__52 = 53;
    public static readonly T__53 = 54;
    public static readonly T__54 = 55;
    public static readonly T__55 = 56;
    public static readonly T__56 = 57;
    public static readonly T__57 = 58;
    public static readonly T__58 = 59;
    public static readonly T__59 = 60;
    public static readonly T__60 = 61;
    public static readonly T__61 = 62;
    public static readonly WS = 63;
    public static readonly SEMI = 64;
    public static readonly NUMBER = 65;
    public static readonly HEX = 66;
    public static readonly OCT = 67;
    public static readonly BIN = 68;
    public static readonly ID = 69;
    public static readonly STRING = 70;
    public static readonly BLOCK_COMMENT = 71;
    public static readonly LINE_COMMENT = 72;
    public static readonly EOF = Token.EOF;

    public static readonly channelNames: string[] = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
    public static readonly literalNames: (string | null)[] = [null, "'class'",
        "'extend'",
        "'{'", "'}'",
        "'private'",
        "'protected'",
        "'public'",
        "'static'",
        "'='", "'def'",
        "'('", "')'",
        "','", "'try'",
        "'catch'", "'finally'",
        "'throw'", "'else'",
        "'if'", "'for'",
        "'in'", "'while'",
        "'return'",
        "'continue'",
        "'break'", "'--'",
        "'++'", "'!'",
        "'~'", "'+'",
        "'-'", "'*'",
        "'/'", "'%'",
        "'>='", "'<='",
        "'>'", "'<'",
        "'=='", "'!='",
        "'&'", "'^'",
        "'|'", "'&&'",
        "'||'", "'?'",
        "':'", "'new'",
        "'true'", "'false'",
        "'null'", "'+='",
        "'-='", "'*='",
        "'/='", "'%='",
        "'&='", "'|='",
        "'^='", "'['",
        "']'", "'.'",
        null, "';'"];
    public static readonly symbolicNames: (string | null)[] = [null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, "WS",
        "SEMI", "NUMBER",
        "HEX", "OCT",
        "BIN", "ID",
        "STRING", "BLOCK_COMMENT",
        "LINE_COMMENT"];
    public static readonly modeNames: string[] = ["DEFAULT_MODE",];

    public static readonly ruleNames: string[] = [
        "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8",
        "T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16",
        "T__17", "T__18", "T__19", "T__20", "T__21", "T__22", "T__23", "T__24",
        "T__25", "T__26", "T__27", "T__28", "T__29", "T__30", "T__31", "T__32",
        "T__33", "T__34", "T__35", "T__36", "T__37", "T__38", "T__39", "T__40",
        "T__41", "T__42", "T__43", "T__44", "T__45", "T__46", "T__47", "T__48",
        "T__49", "T__50", "T__51", "T__52", "T__53", "T__54", "T__55", "T__56",
        "T__57", "T__58", "T__59", "T__60", "T__61", "WS", "SEMI", "NUMBER", "HEX",
        "OCT", "BIN", "ID", "STRING", "BLOCK_COMMENT", "LINE_COMMENT",
    ];


    constructor(input: CharStream) {
        super(input);
        this._interp = new LexerATNSimulator(this, MoonLexer._ATN, MoonLexer.DecisionsToDFA, new PredictionContextCache());
    }

    public get grammarFileName(): string {
        return "Moon.g4";
    }

    public get literalNames(): (string | null)[] {
        return MoonLexer.literalNames;
    }

    public get symbolicNames(): (string | null)[] {
        return MoonLexer.symbolicNames;
    }

    public get ruleNames(): string[] {
        return MoonLexer.ruleNames;
    }

    public get serializedATN(): number[] {
        return MoonLexer._serializedATN;
    }

    public get channelNames(): string[] {
        return MoonLexer.channelNames;
    }

    public get modeNames(): string[] {
        return MoonLexer.modeNames;
    }

    public static readonly _serializedATN: number[] = [4, 0, 72, 478, 6, -1, 2, 0,
        7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9,
        7, 9, 2, 10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7,
        16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7, 20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23,
        2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2, 27, 7, 27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2,
        31, 7, 31, 2, 32, 7, 32, 2, 33, 7, 33, 2, 34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38,
        7, 38, 2, 39, 7, 39, 2, 40, 7, 40, 2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2, 44, 7, 44, 2, 45, 7,
        45, 2, 46, 7, 46, 2, 47, 7, 47, 2, 48, 7, 48, 2, 49, 7, 49, 2, 50, 7, 50, 2, 51, 7, 51, 2, 52, 7, 52,
        2, 53, 7, 53, 2, 54, 7, 54, 2, 55, 7, 55, 2, 56, 7, 56, 2, 57, 7, 57, 2, 58, 7, 58, 2, 59, 7, 59, 2,
        60, 7, 60, 2, 61, 7, 61, 2, 62, 7, 62, 2, 63, 7, 63, 2, 64, 7, 64, 2, 65, 7, 65, 2, 66, 7, 66, 2, 67,
        7, 67, 2, 68, 7, 68, 2, 69, 7, 69, 2, 70, 7, 70, 2, 71, 7, 71, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1,
        4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1,
        7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 11, 1, 11, 1,
        12, 1, 12, 1, 13, 1, 13, 1, 13, 1, 13, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15,
        1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1,
        17, 1, 17, 1, 18, 1, 18, 1, 18, 1, 19, 1, 19, 1, 19, 1, 19, 1, 20, 1, 20, 1, 20, 1, 21, 1, 21, 1, 21,
        1, 21, 1, 21, 1, 21, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 23, 1, 23, 1, 23, 1, 23, 1,
        23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 25, 1, 25, 1, 25, 1, 26,
        1, 26, 1, 26, 1, 27, 1, 27, 1, 28, 1, 28, 1, 29, 1, 29, 1, 30, 1, 30, 1, 31, 1, 31, 1, 32, 1, 32, 1,
        33, 1, 33, 1, 34, 1, 34, 1, 34, 1, 35, 1, 35, 1, 35, 1, 36, 1, 36, 1, 37, 1, 37, 1, 38, 1, 38, 1, 38,
        1, 39, 1, 39, 1, 39, 1, 40, 1, 40, 1, 41, 1, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1, 43, 1, 44, 1, 44, 1,
        44, 1, 45, 1, 45, 1, 46, 1, 46, 1, 47, 1, 47, 1, 47, 1, 47, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 49,
        1, 49, 1, 49, 1, 49, 1, 49, 1, 49, 1, 50, 1, 50, 1, 50, 1, 50, 1, 50, 1, 51, 1, 51, 1, 51, 1, 52, 1,
        52, 1, 52, 1, 53, 1, 53, 1, 53, 1, 54, 1, 54, 1, 54, 1, 55, 1, 55, 1, 55, 1, 56, 1, 56, 1, 56, 1, 57,
        1, 57, 1, 57, 1, 58, 1, 58, 1, 58, 1, 59, 1, 59, 1, 60, 1, 60, 1, 61, 1, 61, 1, 62, 1, 62, 1, 62, 1,
        62, 1, 63, 1, 63, 1, 64, 4, 64, 383, 8, 64, 11, 64, 12, 64, 384, 1, 64, 1, 64, 4, 64, 389, 8, 64,
        11, 64, 12, 64, 390, 3, 64, 393, 8, 64, 1, 65, 1, 65, 1, 65, 4, 65, 398, 8, 65, 11, 65, 12, 65,
        399, 1, 66, 1, 66, 1, 66, 4, 66, 405, 8, 66, 11, 66, 12, 66, 406, 1, 67, 1, 67, 1, 67, 4, 67, 412,
        8, 67, 11, 67, 12, 67, 413, 1, 68, 1, 68, 5, 68, 418, 8, 68, 10, 68, 12, 68, 421, 9, 68, 1, 69,
        1, 69, 1, 69, 1, 69, 5, 69, 427, 8, 69, 10, 69, 12, 69, 430, 9, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1,
        69, 5, 69, 437, 8, 69, 10, 69, 12, 69, 440, 9, 69, 1, 69, 1, 69, 1, 69, 1, 69, 5, 69, 446, 8, 69,
        10, 69, 12, 69, 449, 9, 69, 1, 69, 3, 69, 452, 8, 69, 1, 70, 1, 70, 1, 70, 1, 70, 5, 70, 458, 8,
        70, 10, 70, 12, 70, 461, 9, 70, 1, 70, 1, 70, 1, 70, 1, 70, 1, 70, 1, 71, 1, 71, 1, 71, 1, 71, 5,
        71, 472, 8, 71, 10, 71, 12, 71, 475, 9, 71, 1, 71, 1, 71, 2, 447, 459, 0, 72, 1, 1, 3, 2, 5, 3, 7,
        4, 9, 5, 11, 6, 13, 7, 15, 8, 17, 9, 19, 10, 21, 11, 23, 12, 25, 13, 27, 14, 29, 15, 31, 16, 33,
        17, 35, 18, 37, 19, 39, 20, 41, 21, 43, 22, 45, 23, 47, 24, 49, 25, 51, 26, 53, 27, 55, 28, 57,
        29, 59, 30, 61, 31, 63, 32, 65, 33, 67, 34, 69, 35, 71, 36, 73, 37, 75, 38, 77, 39, 79, 40, 81,
        41, 83, 42, 85, 43, 87, 44, 89, 45, 91, 46, 93, 47, 95, 48, 97, 49, 99, 50, 101, 51, 103, 52,
        105, 53, 107, 54, 109, 55, 111, 56, 113, 57, 115, 58, 117, 59, 119, 60, 121, 61, 123, 62, 125,
        63, 127, 64, 129, 65, 131, 66, 133, 67, 135, 68, 137, 69, 139, 70, 141, 71, 143, 72, 1, 0, 10,
        2, 0, 9, 10, 32, 32, 2, 0, 88, 88, 120, 120, 3, 0, 48, 57, 65, 70, 97, 102, 2, 0, 79, 79, 111, 111,
        2, 0, 66, 66, 98, 98, 3, 0, 65, 90, 95, 95, 97, 122, 4, 0, 48, 57, 65, 90, 95, 95, 97, 122, 2, 0,
        32, 33, 35, 127, 8, 0, 34, 34, 39, 39, 92, 92, 98, 98, 102, 102, 110, 110, 114, 114, 116, 116,
        2, 0, 10, 10, 13, 13, 493, 0, 1, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 5, 1, 0, 0, 0, 0, 7, 1, 0, 0, 0, 0, 9,
        1, 0, 0, 0, 0, 11, 1, 0, 0, 0, 0, 13, 1, 0, 0, 0, 0, 15, 1, 0, 0, 0, 0, 17, 1, 0, 0, 0, 0, 19, 1, 0, 0,
        0, 0, 21, 1, 0, 0, 0, 0, 23, 1, 0, 0, 0, 0, 25, 1, 0, 0, 0, 0, 27, 1, 0, 0, 0, 0, 29, 1, 0, 0, 0, 0, 31,
        1, 0, 0, 0, 0, 33, 1, 0, 0, 0, 0, 35, 1, 0, 0, 0, 0, 37, 1, 0, 0, 0, 0, 39, 1, 0, 0, 0, 0, 41, 1, 0, 0,
        0, 0, 43, 1, 0, 0, 0, 0, 45, 1, 0, 0, 0, 0, 47, 1, 0, 0, 0, 0, 49, 1, 0, 0, 0, 0, 51, 1, 0, 0, 0, 0, 53,
        1, 0, 0, 0, 0, 55, 1, 0, 0, 0, 0, 57, 1, 0, 0, 0, 0, 59, 1, 0, 0, 0, 0, 61, 1, 0, 0, 0, 0, 63, 1, 0, 0,
        0, 0, 65, 1, 0, 0, 0, 0, 67, 1, 0, 0, 0, 0, 69, 1, 0, 0, 0, 0, 71, 1, 0, 0, 0, 0, 73, 1, 0, 0, 0, 0, 75,
        1, 0, 0, 0, 0, 77, 1, 0, 0, 0, 0, 79, 1, 0, 0, 0, 0, 81, 1, 0, 0, 0, 0, 83, 1, 0, 0, 0, 0, 85, 1, 0, 0,
        0, 0, 87, 1, 0, 0, 0, 0, 89, 1, 0, 0, 0, 0, 91, 1, 0, 0, 0, 0, 93, 1, 0, 0, 0, 0, 95, 1, 0, 0, 0, 0, 97,
        1, 0, 0, 0, 0, 99, 1, 0, 0, 0, 0, 101, 1, 0, 0, 0, 0, 103, 1, 0, 0, 0, 0, 105, 1, 0, 0, 0, 0, 107, 1,
        0, 0, 0, 0, 109, 1, 0, 0, 0, 0, 111, 1, 0, 0, 0, 0, 113, 1, 0, 0, 0, 0, 115, 1, 0, 0, 0, 0, 117, 1, 0,
        0, 0, 0, 119, 1, 0, 0, 0, 0, 121, 1, 0, 0, 0, 0, 123, 1, 0, 0, 0, 0, 125, 1, 0, 0, 0, 0, 127, 1, 0, 0,
        0, 0, 129, 1, 0, 0, 0, 0, 131, 1, 0, 0, 0, 0, 133, 1, 0, 0, 0, 0, 135, 1, 0, 0, 0, 0, 137, 1, 0, 0, 0,
        0, 139, 1, 0, 0, 0, 0, 141, 1, 0, 0, 0, 0, 143, 1, 0, 0, 0, 1, 145, 1, 0, 0, 0, 3, 151, 1, 0, 0, 0, 5,
        158, 1, 0, 0, 0, 7, 160, 1, 0, 0, 0, 9, 162, 1, 0, 0, 0, 11, 170, 1, 0, 0, 0, 13, 180, 1, 0, 0, 0, 15,
        187, 1, 0, 0, 0, 17, 194, 1, 0, 0, 0, 19, 196, 1, 0, 0, 0, 21, 200, 1, 0, 0, 0, 23, 202, 1, 0, 0, 0,
        25, 204, 1, 0, 0, 0, 27, 206, 1, 0, 0, 0, 29, 210, 1, 0, 0, 0, 31, 216, 1, 0, 0, 0, 33, 224, 1, 0,
        0, 0, 35, 230, 1, 0, 0, 0, 37, 235, 1, 0, 0, 0, 39, 238, 1, 0, 0, 0, 41, 242, 1, 0, 0, 0, 43, 245,
        1, 0, 0, 0, 45, 251, 1, 0, 0, 0, 47, 258, 1, 0, 0, 0, 49, 267, 1, 0, 0, 0, 51, 273, 1, 0, 0, 0, 53,
        276, 1, 0, 0, 0, 55, 279, 1, 0, 0, 0, 57, 281, 1, 0, 0, 0, 59, 283, 1, 0, 0, 0, 61, 285, 1, 0, 0, 0,
        63, 287, 1, 0, 0, 0, 65, 289, 1, 0, 0, 0, 67, 291, 1, 0, 0, 0, 69, 293, 1, 0, 0, 0, 71, 296, 1, 0,
        0, 0, 73, 299, 1, 0, 0, 0, 75, 301, 1, 0, 0, 0, 77, 303, 1, 0, 0, 0, 79, 306, 1, 0, 0, 0, 81, 309,
        1, 0, 0, 0, 83, 311, 1, 0, 0, 0, 85, 313, 1, 0, 0, 0, 87, 315, 1, 0, 0, 0, 89, 318, 1, 0, 0, 0, 91,
        321, 1, 0, 0, 0, 93, 323, 1, 0, 0, 0, 95, 325, 1, 0, 0, 0, 97, 329, 1, 0, 0, 0, 99, 334, 1, 0, 0, 0,
        101, 340, 1, 0, 0, 0, 103, 345, 1, 0, 0, 0, 105, 348, 1, 0, 0, 0, 107, 351, 1, 0, 0, 0, 109, 354,
        1, 0, 0, 0, 111, 357, 1, 0, 0, 0, 113, 360, 1, 0, 0, 0, 115, 363, 1, 0, 0, 0, 117, 366, 1, 0, 0, 0,
        119, 369, 1, 0, 0, 0, 121, 371, 1, 0, 0, 0, 123, 373, 1, 0, 0, 0, 125, 375, 1, 0, 0, 0, 127, 379,
        1, 0, 0, 0, 129, 382, 1, 0, 0, 0, 131, 394, 1, 0, 0, 0, 133, 401, 1, 0, 0, 0, 135, 408, 1, 0, 0, 0,
        137, 415, 1, 0, 0, 0, 139, 451, 1, 0, 0, 0, 141, 453, 1, 0, 0, 0, 143, 467, 1, 0, 0, 0, 145, 146,
        5, 99, 0, 0, 146, 147, 5, 108, 0, 0, 147, 148, 5, 97, 0, 0, 148, 149, 5, 115, 0, 0, 149, 150, 5,
        115, 0, 0, 150, 2, 1, 0, 0, 0, 151, 152, 5, 101, 0, 0, 152, 153, 5, 120, 0, 0, 153, 154, 5, 116,
        0, 0, 154, 155, 5, 101, 0, 0, 155, 156, 5, 110, 0, 0, 156, 157, 5, 100, 0, 0, 157, 4, 1, 0, 0, 0,
        158, 159, 5, 123, 0, 0, 159, 6, 1, 0, 0, 0, 160, 161, 5, 125, 0, 0, 161, 8, 1, 0, 0, 0, 162, 163,
        5, 112, 0, 0, 163, 164, 5, 114, 0, 0, 164, 165, 5, 105, 0, 0, 165, 166, 5, 118, 0, 0, 166, 167,
        5, 97, 0, 0, 167, 168, 5, 116, 0, 0, 168, 169, 5, 101, 0, 0, 169, 10, 1, 0, 0, 0, 170, 171, 5, 112,
        0, 0, 171, 172, 5, 114, 0, 0, 172, 173, 5, 111, 0, 0, 173, 174, 5, 116, 0, 0, 174, 175, 5, 101,
        0, 0, 175, 176, 5, 99, 0, 0, 176, 177, 5, 116, 0, 0, 177, 178, 5, 101, 0, 0, 178, 179, 5, 100,
        0, 0, 179, 12, 1, 0, 0, 0, 180, 181, 5, 112, 0, 0, 181, 182, 5, 117, 0, 0, 182, 183, 5, 98, 0, 0,
        183, 184, 5, 108, 0, 0, 184, 185, 5, 105, 0, 0, 185, 186, 5, 99, 0, 0, 186, 14, 1, 0, 0, 0, 187,
        188, 5, 115, 0, 0, 188, 189, 5, 116, 0, 0, 189, 190, 5, 97, 0, 0, 190, 191, 5, 116, 0, 0, 191,
        192, 5, 105, 0, 0, 192, 193, 5, 99, 0, 0, 193, 16, 1, 0, 0, 0, 194, 195, 5, 61, 0, 0, 195, 18, 1,
        0, 0, 0, 196, 197, 5, 100, 0, 0, 197, 198, 5, 101, 0, 0, 198, 199, 5, 102, 0, 0, 199, 20, 1, 0,
        0, 0, 200, 201, 5, 40, 0, 0, 201, 22, 1, 0, 0, 0, 202, 203, 5, 41, 0, 0, 203, 24, 1, 0, 0, 0, 204,
        205, 5, 44, 0, 0, 205, 26, 1, 0, 0, 0, 206, 207, 5, 116, 0, 0, 207, 208, 5, 114, 0, 0, 208, 209,
        5, 121, 0, 0, 209, 28, 1, 0, 0, 0, 210, 211, 5, 99, 0, 0, 211, 212, 5, 97, 0, 0, 212, 213, 5, 116,
        0, 0, 213, 214, 5, 99, 0, 0, 214, 215, 5, 104, 0, 0, 215, 30, 1, 0, 0, 0, 216, 217, 5, 102, 0, 0,
        217, 218, 5, 105, 0, 0, 218, 219, 5, 110, 0, 0, 219, 220, 5, 97, 0, 0, 220, 221, 5, 108, 0, 0,
        221, 222, 5, 108, 0, 0, 222, 223, 5, 121, 0, 0, 223, 32, 1, 0, 0, 0, 224, 225, 5, 116, 0, 0, 225,
        226, 5, 104, 0, 0, 226, 227, 5, 114, 0, 0, 227, 228, 5, 111, 0, 0, 228, 229, 5, 119, 0, 0, 229,
        34, 1, 0, 0, 0, 230, 231, 5, 101, 0, 0, 231, 232, 5, 108, 0, 0, 232, 233, 5, 115, 0, 0, 233, 234,
        5, 101, 0, 0, 234, 36, 1, 0, 0, 0, 235, 236, 5, 105, 0, 0, 236, 237, 5, 102, 0, 0, 237, 38, 1, 0,
        0, 0, 238, 239, 5, 102, 0, 0, 239, 240, 5, 111, 0, 0, 240, 241, 5, 114, 0, 0, 241, 40, 1, 0, 0,
        0, 242, 243, 5, 105, 0, 0, 243, 244, 5, 110, 0, 0, 244, 42, 1, 0, 0, 0, 245, 246, 5, 119, 0, 0,
        246, 247, 5, 104, 0, 0, 247, 248, 5, 105, 0, 0, 248, 249, 5, 108, 0, 0, 249, 250, 5, 101, 0, 0,
        250, 44, 1, 0, 0, 0, 251, 252, 5, 114, 0, 0, 252, 253, 5, 101, 0, 0, 253, 254, 5, 116, 0, 0, 254,
        255, 5, 117, 0, 0, 255, 256, 5, 114, 0, 0, 256, 257, 5, 110, 0, 0, 257, 46, 1, 0, 0, 0, 258, 259,
        5, 99, 0, 0, 259, 260, 5, 111, 0, 0, 260, 261, 5, 110, 0, 0, 261, 262, 5, 116, 0, 0, 262, 263,
        5, 105, 0, 0, 263, 264, 5, 110, 0, 0, 264, 265, 5, 117, 0, 0, 265, 266, 5, 101, 0, 0, 266, 48,
        1, 0, 0, 0, 267, 268, 5, 98, 0, 0, 268, 269, 5, 114, 0, 0, 269, 270, 5, 101, 0, 0, 270, 271, 5,
        97, 0, 0, 271, 272, 5, 107, 0, 0, 272, 50, 1, 0, 0, 0, 273, 274, 5, 45, 0, 0, 274, 275, 5, 45, 0,
        0, 275, 52, 1, 0, 0, 0, 276, 277, 5, 43, 0, 0, 277, 278, 5, 43, 0, 0, 278, 54, 1, 0, 0, 0, 279, 280,
        5, 33, 0, 0, 280, 56, 1, 0, 0, 0, 281, 282, 5, 126, 0, 0, 282, 58, 1, 0, 0, 0, 283, 284, 5, 43, 0,
        0, 284, 60, 1, 0, 0, 0, 285, 286, 5, 45, 0, 0, 286, 62, 1, 0, 0, 0, 287, 288, 5, 42, 0, 0, 288, 64,
        1, 0, 0, 0, 289, 290, 5, 47, 0, 0, 290, 66, 1, 0, 0, 0, 291, 292, 5, 37, 0, 0, 292, 68, 1, 0, 0, 0,
        293, 294, 5, 62, 0, 0, 294, 295, 5, 61, 0, 0, 295, 70, 1, 0, 0, 0, 296, 297, 5, 60, 0, 0, 297, 298,
        5, 61, 0, 0, 298, 72, 1, 0, 0, 0, 299, 300, 5, 62, 0, 0, 300, 74, 1, 0, 0, 0, 301, 302, 5, 60, 0,
        0, 302, 76, 1, 0, 0, 0, 303, 304, 5, 61, 0, 0, 304, 305, 5, 61, 0, 0, 305, 78, 1, 0, 0, 0, 306, 307,
        5, 33, 0, 0, 307, 308, 5, 61, 0, 0, 308, 80, 1, 0, 0, 0, 309, 310, 5, 38, 0, 0, 310, 82, 1, 0, 0,
        0, 311, 312, 5, 94, 0, 0, 312, 84, 1, 0, 0, 0, 313, 314, 5, 124, 0, 0, 314, 86, 1, 0, 0, 0, 315,
        316, 5, 38, 0, 0, 316, 317, 5, 38, 0, 0, 317, 88, 1, 0, 0, 0, 318, 319, 5, 124, 0, 0, 319, 320,
        5, 124, 0, 0, 320, 90, 1, 0, 0, 0, 321, 322, 5, 63, 0, 0, 322, 92, 1, 0, 0, 0, 323, 324, 5, 58, 0,
        0, 324, 94, 1, 0, 0, 0, 325, 326, 5, 110, 0, 0, 326, 327, 5, 101, 0, 0, 327, 328, 5, 119, 0, 0,
        328, 96, 1, 0, 0, 0, 329, 330, 5, 116, 0, 0, 330, 331, 5, 114, 0, 0, 331, 332, 5, 117, 0, 0, 332,
        333, 5, 101, 0, 0, 333, 98, 1, 0, 0, 0, 334, 335, 5, 102, 0, 0, 335, 336, 5, 97, 0, 0, 336, 337,
        5, 108, 0, 0, 337, 338, 5, 115, 0, 0, 338, 339, 5, 101, 0, 0, 339, 100, 1, 0, 0, 0, 340, 341, 5,
        110, 0, 0, 341, 342, 5, 117, 0, 0, 342, 343, 5, 108, 0, 0, 343, 344, 5, 108, 0, 0, 344, 102, 1,
        0, 0, 0, 345, 346, 5, 43, 0, 0, 346, 347, 5, 61, 0, 0, 347, 104, 1, 0, 0, 0, 348, 349, 5, 45, 0,
        0, 349, 350, 5, 61, 0, 0, 350, 106, 1, 0, 0, 0, 351, 352, 5, 42, 0, 0, 352, 353, 5, 61, 0, 0, 353,
        108, 1, 0, 0, 0, 354, 355, 5, 47, 0, 0, 355, 356, 5, 61, 0, 0, 356, 110, 1, 0, 0, 0, 357, 358, 5,
        37, 0, 0, 358, 359, 5, 61, 0, 0, 359, 112, 1, 0, 0, 0, 360, 361, 5, 38, 0, 0, 361, 362, 5, 61, 0,
        0, 362, 114, 1, 0, 0, 0, 363, 364, 5, 124, 0, 0, 364, 365, 5, 61, 0, 0, 365, 116, 1, 0, 0, 0, 366,
        367, 5, 94, 0, 0, 367, 368, 5, 61, 0, 0, 368, 118, 1, 0, 0, 0, 369, 370, 5, 91, 0, 0, 370, 120,
        1, 0, 0, 0, 371, 372, 5, 93, 0, 0, 372, 122, 1, 0, 0, 0, 373, 374, 5, 46, 0, 0, 374, 124, 1, 0, 0,
        0, 375, 376, 7, 0, 0, 0, 376, 377, 1, 0, 0, 0, 377, 378, 6, 62, 0, 0, 378, 126, 1, 0, 0, 0, 379,
        380, 5, 59, 0, 0, 380, 128, 1, 0, 0, 0, 381, 383, 2, 48, 57, 0, 382, 381, 1, 0, 0, 0, 383, 384,
        1, 0, 0, 0, 384, 382, 1, 0, 0, 0, 384, 385, 1, 0, 0, 0, 385, 392, 1, 0, 0, 0, 386, 388, 5, 46, 0,
        0, 387, 389, 2, 48, 57, 0, 388, 387, 1, 0, 0, 0, 389, 390, 1, 0, 0, 0, 390, 388, 1, 0, 0, 0, 390,
        391, 1, 0, 0, 0, 391, 393, 1, 0, 0, 0, 392, 386, 1, 0, 0, 0, 392, 393, 1, 0, 0, 0, 393, 130, 1, 0,
        0, 0, 394, 395, 5, 48, 0, 0, 395, 397, 7, 1, 0, 0, 396, 398, 7, 2, 0, 0, 397, 396, 1, 0, 0, 0, 398,
        399, 1, 0, 0, 0, 399, 397, 1, 0, 0, 0, 399, 400, 1, 0, 0, 0, 400, 132, 1, 0, 0, 0, 401, 402, 5, 48,
        0, 0, 402, 404, 7, 3, 0, 0, 403, 405, 2, 48, 55, 0, 404, 403, 1, 0, 0, 0, 405, 406, 1, 0, 0, 0, 406,
        404, 1, 0, 0, 0, 406, 407, 1, 0, 0, 0, 407, 134, 1, 0, 0, 0, 408, 409, 5, 48, 0, 0, 409, 411, 7,
        4, 0, 0, 410, 412, 2, 48, 49, 0, 411, 410, 1, 0, 0, 0, 412, 413, 1, 0, 0, 0, 413, 411, 1, 0, 0, 0,
        413, 414, 1, 0, 0, 0, 414, 136, 1, 0, 0, 0, 415, 419, 7, 5, 0, 0, 416, 418, 7, 6, 0, 0, 417, 416,
        1, 0, 0, 0, 418, 421, 1, 0, 0, 0, 419, 417, 1, 0, 0, 0, 419, 420, 1, 0, 0, 0, 420, 138, 1, 0, 0, 0,
        421, 419, 1, 0, 0, 0, 422, 428, 5, 34, 0, 0, 423, 427, 7, 7, 0, 0, 424, 425, 5, 92, 0, 0, 425, 427,
        7, 8, 0, 0, 426, 423, 1, 0, 0, 0, 426, 424, 1, 0, 0, 0, 427, 430, 1, 0, 0, 0, 428, 426, 1, 0, 0, 0,
        428, 429, 1, 0, 0, 0, 429, 431, 1, 0, 0, 0, 430, 428, 1, 0, 0, 0, 431, 452, 5, 34, 0, 0, 432, 438,
        5, 39, 0, 0, 433, 437, 7, 7, 0, 0, 434, 435, 5, 92, 0, 0, 435, 437, 7, 8, 0, 0, 436, 433, 1, 0, 0,
        0, 436, 434, 1, 0, 0, 0, 437, 440, 1, 0, 0, 0, 438, 436, 1, 0, 0, 0, 438, 439, 1, 0, 0, 0, 439, 441,
        1, 0, 0, 0, 440, 438, 1, 0, 0, 0, 441, 452, 5, 39, 0, 0, 442, 443, 5, 114, 0, 0, 443, 447, 5, 34,
        0, 0, 444, 446, 9, 0, 0, 0, 445, 444, 1, 0, 0, 0, 446, 449, 1, 0, 0, 0, 447, 448, 1, 0, 0, 0, 447,
        445, 1, 0, 0, 0, 448, 450, 1, 0, 0, 0, 449, 447, 1, 0, 0, 0, 450, 452, 5, 34, 0, 0, 451, 422, 1,
        0, 0, 0, 451, 432, 1, 0, 0, 0, 451, 442, 1, 0, 0, 0, 452, 140, 1, 0, 0, 0, 453, 454, 5, 47, 0, 0,
        454, 455, 5, 42, 0, 0, 455, 459, 1, 0, 0, 0, 456, 458, 9, 0, 0, 0, 457, 456, 1, 0, 0, 0, 458, 461,
        1, 0, 0, 0, 459, 460, 1, 0, 0, 0, 459, 457, 1, 0, 0, 0, 460, 462, 1, 0, 0, 0, 461, 459, 1, 0, 0, 0,
        462, 463, 5, 42, 0, 0, 463, 464, 5, 47, 0, 0, 464, 465, 1, 0, 0, 0, 465, 466, 6, 70, 1, 0, 466,
        142, 1, 0, 0, 0, 467, 468, 5, 47, 0, 0, 468, 469, 5, 47, 0, 0, 469, 473, 1, 0, 0, 0, 470, 472, 8,
        9, 0, 0, 471, 470, 1, 0, 0, 0, 472, 475, 1, 0, 0, 0, 473, 471, 1, 0, 0, 0, 473, 474, 1, 0, 0, 0, 474,
        476, 1, 0, 0, 0, 475, 473, 1, 0, 0, 0, 476, 477, 6, 71, 1, 0, 477, 144, 1, 0, 0, 0, 16, 0, 384, 390,
        392, 399, 406, 413, 419, 426, 428, 436, 438, 447, 451, 459, 473, 2, 6, 0, 0, 0, 1, 0];

    private static __ATN: ATN;
    public static get _ATN(): ATN {
        if (!MoonLexer.__ATN) {
            MoonLexer.__ATN = new ATNDeserializer().deserialize(MoonLexer._serializedATN);
        }

        return MoonLexer.__ATN;
    }


    static DecisionsToDFA = MoonLexer._ATN.decisionToState.map((ds: DecisionState, index: number) => new DFA(ds, index));
}

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export class MoonParser extends Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly T__17 = 18;
    public static readonly T__18 = 19;
    public static readonly T__19 = 20;
    public static readonly T__20 = 21;
    public static readonly T__21 = 22;
    public static readonly T__22 = 23;
    public static readonly T__23 = 24;
    public static readonly T__24 = 25;
    public static readonly T__25 = 26;
    public static readonly T__26 = 27;
    public static readonly T__27 = 28;
    public static readonly T__28 = 29;
    public static readonly T__29 = 30;
    public static readonly T__30 = 31;
    public static readonly T__31 = 32;
    public static readonly T__32 = 33;
    public static readonly T__33 = 34;
    public static readonly T__34 = 35;
    public static readonly T__35 = 36;
    public static readonly T__36 = 37;
    public static readonly T__37 = 38;
    public static readonly T__38 = 39;
    public static readonly T__39 = 40;
    public static readonly T__40 = 41;
    public static readonly T__41 = 42;
    public static readonly T__42 = 43;
    public static readonly T__43 = 44;
    public static readonly T__44 = 45;
    public static readonly T__45 = 46;
    public static readonly T__46 = 47;
    public static readonly T__47 = 48;
    public static readonly T__48 = 49;
    public static readonly T__49 = 50;
    public static readonly T__50 = 51;
    public static readonly T__51 = 52;
    public static readonly T__52 = 53;
    public static readonly T__53 = 54;
    public static readonly T__54 = 55;
    public static readonly T__55 = 56;
    public static readonly T__56 = 57;
    public static readonly T__57 = 58;
    public static readonly T__58 = 59;
    public static readonly T__59 = 60;
    public static readonly T__60 = 61;
    public static readonly T__61 = 62;
    public static readonly WS = 63;
    public static readonly SEMI = 64;
    public static readonly NUMBER = 65;
    public static readonly HEX = 66;
    public static readonly OCT = 67;
    public static readonly BIN = 68;
    public static readonly ID = 69;
    public static readonly STRING = 70;
    public static readonly BLOCK_COMMENT = 71;
    public static readonly LINE_COMMENT = 72;
    public static readonly EOF = Token.EOF;
    public static readonly RULE_program = 0;
    public static readonly RULE_declarations = 1;
    public static readonly RULE_classDeclaration = 2;
    public static readonly RULE_members = 3;
    public static readonly RULE_member = 4;
    public static readonly RULE_variableDeclaration = 5;
    public static readonly RULE_functionDeclaration = 6;
    public static readonly RULE_params = 7;
    public static readonly RULE_statements = 8;
    public static readonly RULE_blockStatement = 9;
    public static readonly RULE_tryStatement = 10;
    public static readonly RULE_catchClause = 11;
    public static readonly RULE_finallyClause = 12;
    public static readonly RULE_throwStatement = 13;
    public static readonly RULE_ifStatement = 14;
    public static readonly RULE_multiIfStatement = 15;
    public static readonly RULE_elseStatement = 16;
    public static readonly RULE_forStatement = 17;
    public static readonly RULE_whileStatement = 18;
    public static readonly RULE_returnStatement = 19;
    public static readonly RULE_continueStatement = 20;
    public static readonly RULE_breakStatement = 21;
    public static readonly RULE_expression = 22;
    public static readonly RULE_accessExpression = 23;
    public static readonly RULE_arguments = 24;
    public static readonly literalNames: (string | null)[] = [null, "'class'",
        "'extend'",
        "'{'", "'}'",
        "'private'",
        "'protected'",
        "'public'",
        "'static'",
        "'='", "'def'",
        "'('", "')'",
        "','", "'try'",
        "'catch'", "'finally'",
        "'throw'", "'else'",
        "'if'", "'for'",
        "'in'", "'while'",
        "'return'",
        "'continue'",
        "'break'", "'--'",
        "'++'", "'!'",
        "'~'", "'+'",
        "'-'", "'*'",
        "'/'", "'%'",
        "'>='", "'<='",
        "'>'", "'<'",
        "'=='", "'!='",
        "'&'", "'^'",
        "'|'", "'&&'",
        "'||'", "'?'",
        "':'", "'new'",
        "'true'", "'false'",
        "'null'", "'+='",
        "'-='", "'*='",
        "'/='", "'%='",
        "'&='", "'|='",
        "'^='", "'['",
        "']'", "'.'",
        null, "';'"];
    public static readonly symbolicNames: (string | null)[] = [null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, null,
        null, "WS",
        "SEMI", "NUMBER",
        "HEX", "OCT",
        "BIN", "ID",
        "STRING", "BLOCK_COMMENT",
        "LINE_COMMENT"];
    // tslint:disable:no-trailing-whitespace
    public static readonly ruleNames: string[] = [
        "program", "declarations", "classDeclaration", "members", "member", "variableDeclaration",
        "functionDeclaration", "params", "statements", "blockStatement", "tryStatement",
        "catchClause", "finallyClause", "throwStatement", "ifStatement", "multiIfStatement",
        "elseStatement", "forStatement", "whileStatement", "returnStatement",
        "continueStatement", "breakStatement", "expression", "accessExpression",
        "arguments",
    ];

    public get grammarFileName(): string {
        return "Moon.g4";
    }

    public get literalNames(): (string | null)[] {
        return MoonParser.literalNames;
    }

    public get symbolicNames(): (string | null)[] {
        return MoonParser.symbolicNames;
    }

    public get ruleNames(): string[] {
        return MoonParser.ruleNames;
    }

    public get serializedATN(): number[] {
        return MoonParser._serializedATN;
    }

    protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
        return new FailedPredicateException(this, predicate, message);
    }

    constructor(input: TokenStream) {
        super(input);
        this._interp = new ParserATNSimulator(this, MoonParser._ATN, MoonParser.DecisionsToDFA, new PredictionContextCache());
    }

    // @RuleVersion(0)
    public program(): ProgramContext {
        let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
        this.enterRule(localctx, 0, MoonParser.RULE_program);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 50;
                this.declarations(0);
                this.state = 51;
                this.match(MoonParser.EOF);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    public declarations(): DeclarationsContext;
    public declarations(_p: number): DeclarationsContext;
    // @RuleVersion(0)
    public declarations(_p?: number): DeclarationsContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let localctx: DeclarationsContext = new DeclarationsContext(this, this._ctx, _parentState);
        let _prevctx: DeclarationsContext = localctx;
        let _startState: number = 2;
        this.enterRecursionRule(localctx, 2, MoonParser.RULE_declarations, _p);
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 59;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 1: {
                        this.state = 54;
                        this.classDeclaration();
                    }
                        break;
                    case 10: {
                        this.state = 55;
                        this.functionDeclaration();
                    }
                        break;
                    case 69: {
                        this.state = 56;
                        this.variableDeclaration();
                        this.state = 57;
                        this.match(MoonParser.SEMI);
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 65;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            {
                                localctx = new DeclarationsContext(this, _parentctx, _parentState);
                                this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_declarations);
                                this.state = 61;
                                if (!(this.precpred(this._ctx, 4))) {
                                    throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
                                }
                                this.state = 62;
                                this.declarations(5);
                            }
                        }
                    }
                    this.state = 67;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    // @RuleVersion(0)
    public classDeclaration(): ClassDeclarationContext {
        let localctx: ClassDeclarationContext = new ClassDeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 4, MoonParser.RULE_classDeclaration);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 68;
                this.match(MoonParser.T__0);
                this.state = 69;
                this.match(MoonParser.ID);
                this.state = 73;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 2: {
                        this.state = 70;
                        this.match(MoonParser.T__1);
                        this.state = 71;
                        this.match(MoonParser.ID);
                    }
                        break;
                    case 3:
                        // tslint:disable-next-line:no-empty
                    {
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this.state = 75;
                this.match(MoonParser.T__2);
                this.state = 78;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 10:
                    case 69: {
                        this.state = 76;
                        this.members(0);
                    }
                        break;
                    case 4:
                        // tslint:disable-next-line:no-empty
                    {
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this.state = 80;
                this.match(MoonParser.T__3);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    public members(): MembersContext;
    public members(_p: number): MembersContext;
    // @RuleVersion(0)
    public members(_p?: number): MembersContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let localctx: MembersContext = new MembersContext(this, this._ctx, _parentState);
        let _prevctx: MembersContext = localctx;
        let _startState: number = 6;
        this.enterRecursionRule(localctx, 6, MoonParser.RULE_members, _p);
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                {
                    this.state = 83;
                    this.member();
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 89;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            {
                                localctx = new MembersContext(this, _parentctx, _parentState);
                                this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_members);
                                this.state = 85;
                                if (!(this.precpred(this._ctx, 2))) {
                                    throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
                                }
                                this.state = 86;
                                this.members(3);
                            }
                        }
                    }
                    this.state = 91;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    // @RuleVersion(0)
    public member(): MemberContext {
        let localctx: MemberContext = new MemberContext(this, this._ctx, this.state);
        this.enterRule(localctx, 8, MoonParser.RULE_member);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 96;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 5: {
                        this.state = 92;
                        this.match(MoonParser.T__4);
                    }
                        break;
                    case 6: {
                        this.state = 93;
                        this.match(MoonParser.T__5);
                    }
                        break;
                    case 7: {
                        this.state = 94;
                        this.match(MoonParser.T__6);
                    }
                        break;
                    case 8:
                    case 10:
                    case 69:
                        // tslint:disable-next-line:no-empty
                    {
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this.state = 100;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 8: {
                        this.state = 98;
                        this.match(MoonParser.T__7);
                    }
                        break;
                    case 10:
                    case 69:
                        // tslint:disable-next-line:no-empty
                    {
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this.state = 106;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 10: {
                        this.state = 102;
                        this.functionDeclaration();
                    }
                        break;
                    case 69: {
                        this.state = 103;
                        this.variableDeclaration();
                        this.state = 104;
                        this.match(MoonParser.SEMI);
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public variableDeclaration(): VariableDeclarationContext {
        let localctx: VariableDeclarationContext = new VariableDeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 10, MoonParser.RULE_variableDeclaration);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 108;
                this.match(MoonParser.ID);
                this.state = 109;
                this.match(MoonParser.T__8);
                this.state = 110;
                this.expression(0);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public functionDeclaration(): FunctionDeclarationContext {
        let localctx: FunctionDeclarationContext = new FunctionDeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 12, MoonParser.RULE_functionDeclaration);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 112;
                this.match(MoonParser.T__9);
                this.state = 113;
                this.match(MoonParser.ID);
                this.state = 121;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 11: {
                        this.state = 114;
                        this.match(MoonParser.T__10);
                        this.state = 117;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 69: {
                                this.state = 115;
                                this.params(0);
                            }
                                break;
                            case 12:
                                // tslint:disable-next-line:no-empty
                            {
                            }
                                break;
                            default:
                                throw new NoViableAltException(this);
                        }
                        this.state = 119;
                        this.match(MoonParser.T__11);
                    }
                        break;
                    case 3:
                        // tslint:disable-next-line:no-empty
                    {
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this.state = 123;
                this.blockStatement();
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    public params(): ParamsContext;
    public params(_p: number): ParamsContext;
    // @RuleVersion(0)
    public params(_p?: number): ParamsContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let localctx: ParamsContext = new ParamsContext(this, this._ctx, _parentState);
        let _prevctx: ParamsContext = localctx;
        let _startState: number = 14;
        this.enterRecursionRule(localctx, 14, MoonParser.RULE_params, _p);
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                {
                    this.state = 126;
                    this.match(MoonParser.ID);
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 133;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            {
                                localctx = new ParamsContext(this, _parentctx, _parentState);
                                this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_params);
                                this.state = 128;
                                if (!(this.precpred(this._ctx, 2))) {
                                    throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
                                }
                                this.state = 129;
                                this.match(MoonParser.T__12);
                                this.state = 130;
                                this.params(3);
                            }
                        }
                    }
                    this.state = 135;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    public statements(): StatementsContext;
    public statements(_p: number): StatementsContext;
    // @RuleVersion(0)
    public statements(_p?: number): StatementsContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let localctx: StatementsContext = new StatementsContext(this, this._ctx, _parentState);
        let _prevctx: StatementsContext = localctx;
        let _startState: number = 16;
        this.enterRecursionRule(localctx, 16, MoonParser.RULE_statements, _p);
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 158;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 11:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70: {
                        this.state = 137;
                        this.expression(0);
                        this.state = 138;
                        this.match(MoonParser.SEMI);
                    }
                        break;
                    case 19: {
                        this.state = 140;
                        this.ifStatement();
                    }
                        break;
                    case 20: {
                        this.state = 141;
                        this.forStatement();
                    }
                        break;
                    case 22: {
                        this.state = 142;
                        this.whileStatement();
                    }
                        break;
                    case 14: {
                        this.state = 143;
                        this.tryStatement();
                    }
                        break;
                    case 23: {
                        this.state = 144;
                        this.returnStatement();
                        this.state = 145;
                        this.match(MoonParser.SEMI);
                    }
                        break;
                    case 24: {
                        this.state = 147;
                        this.continueStatement();
                        this.state = 148;
                        this.match(MoonParser.SEMI);
                    }
                        break;
                    case 25: {
                        this.state = 150;
                        this.breakStatement();
                        this.state = 151;
                        this.match(MoonParser.SEMI);
                    }
                        break;
                    case 17: {
                        this.state = 153;
                        this.throwStatement();
                        this.state = 154;
                        this.match(MoonParser.SEMI);
                    }
                        break;
                    case 3: {
                        this.state = 156;
                        this.blockStatement();
                    }
                        break;
                    case 64: {
                        this.state = 157;
                        this.match(MoonParser.SEMI);
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 164;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            {
                                localctx = new StatementsContext(this, _parentctx, _parentState);
                                this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_statements);
                                this.state = 160;
                                if (!(this.precpred(this._ctx, 12))) {
                                    throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
                                }
                                this.state = 161;
                                this.statements(13);
                            }
                        }
                    }
                    this.state = 166;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    // @RuleVersion(0)
    public blockStatement(): BlockStatementContext {
        let localctx: BlockStatementContext = new BlockStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 18, MoonParser.RULE_blockStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 167;
                this.match(MoonParser.T__2);
                this.state = 170;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 3:
                    case 11:
                    case 14:
                    case 17:
                    case 19:
                    case 20:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70: {
                        this.state = 168;
                        this.statements(0);
                    }
                        break;
                    case 4:
                        // tslint:disable-next-line:no-empty
                    {
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this.state = 172;
                this.match(MoonParser.T__3);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public tryStatement(): TryStatementContext {
        let localctx: TryStatementContext = new TryStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 20, MoonParser.RULE_tryStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 174;
                this.match(MoonParser.T__13);
                this.state = 175;
                this.blockStatement();
                this.state = 181;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 14, this._ctx)) {
                    case 1: {
                        this.state = 176;
                        this.catchClause();
                        this.state = 177;
                        this.finallyClause();
                    }
                        break;
                    case 2: {
                        this.state = 179;
                        this.catchClause();
                    }
                        break;
                    case 3: {
                        this.state = 180;
                        this.finallyClause();
                    }
                        break;
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public catchClause(): CatchClauseContext {
        let localctx: CatchClauseContext = new CatchClauseContext(this, this._ctx, this.state);
        this.enterRule(localctx, 22, MoonParser.RULE_catchClause);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 183;
                this.match(MoonParser.T__14);
                this.state = 184;
                this.match(MoonParser.T__10);
                this.state = 185;
                this.match(MoonParser.ID);
                this.state = 186;
                this.match(MoonParser.T__11);
                this.state = 187;
                this.blockStatement();
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public finallyClause(): FinallyClauseContext {
        let localctx: FinallyClauseContext = new FinallyClauseContext(this, this._ctx, this.state);
        this.enterRule(localctx, 24, MoonParser.RULE_finallyClause);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 189;
                this.match(MoonParser.T__15);
                this.state = 190;
                this.blockStatement();
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public throwStatement(): ThrowStatementContext {
        let localctx: ThrowStatementContext = new ThrowStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 26, MoonParser.RULE_throwStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 192;
                this.match(MoonParser.T__16);
                this.state = 193;
                this.expression(0);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public ifStatement(): IfStatementContext {
        let localctx: IfStatementContext = new IfStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 28, MoonParser.RULE_ifStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 195;
                this.multiIfStatement(0);
                this.state = 196;
                this.elseStatement();
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    public multiIfStatement(): MultiIfStatementContext;
    public multiIfStatement(_p: number): MultiIfStatementContext;
    // @RuleVersion(0)
    public multiIfStatement(_p?: number): MultiIfStatementContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let localctx: MultiIfStatementContext = new MultiIfStatementContext(this, this._ctx, _parentState);
        let _prevctx: MultiIfStatementContext = localctx;
        let _startState: number = 30;
        this.enterRecursionRule(localctx, 30, MoonParser.RULE_multiIfStatement, _p);
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                {
                    this.state = 199;
                    this.match(MoonParser.T__18);
                    this.state = 200;
                    this.match(MoonParser.T__10);
                    this.state = 201;
                    this.expression(0);
                    this.state = 202;
                    this.match(MoonParser.T__11);
                    this.state = 203;
                    this.blockStatement();
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 210;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            {
                                localctx = new MultiIfStatementContext(this, _parentctx, _parentState);
                                this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_multiIfStatement);
                                this.state = 205;
                                if (!(this.precpred(this._ctx, 2))) {
                                    throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
                                }
                                this.state = 206;
                                this.match(MoonParser.T__17);
                                this.state = 207;
                                this.multiIfStatement(3);
                            }
                        }
                    }
                    this.state = 212;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    // @RuleVersion(0)
    public elseStatement(): ElseStatementContext {
        let localctx: ElseStatementContext = new ElseStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 32, MoonParser.RULE_elseStatement);
        try {
            this.state = 216;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 16, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                {
                    this.state = 213;
                    this.match(MoonParser.T__17);
                    this.state = 214;
                    this.blockStatement();
                }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    // tslint:disable-next-line:no-empty
                {
                }
                    break;
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public forStatement(): ForStatementContext {
        let localctx: ForStatementContext = new ForStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 34, MoonParser.RULE_forStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 218;
                this.match(MoonParser.T__19);
                this.state = 219;
                this.match(MoonParser.T__10);
                this.state = 238;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 20, this._ctx)) {
                    case 1: {
                        this.state = 222;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 11:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70: {
                                this.state = 220;
                                this.expression(0);
                            }
                                break;
                            case 64:
                                // tslint:disable-next-line:no-empty
                            {
                            }
                                break;
                            default:
                                throw new NoViableAltException(this);
                        }
                        this.state = 224;
                        this.match(MoonParser.SEMI);
                        this.state = 227;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 11:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70: {
                                this.state = 225;
                                this.expression(0);
                            }
                                break;
                            case 64:
                                // tslint:disable-next-line:no-empty
                            {
                            }
                                break;
                            default:
                                throw new NoViableAltException(this);
                        }
                        this.state = 229;
                        this.match(MoonParser.SEMI);
                        this.state = 232;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 11:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70: {
                                this.state = 230;
                                this.expression(0);
                            }
                                break;
                            case 12:
                                // tslint:disable-next-line:no-empty
                            {
                            }
                                break;
                            default:
                                throw new NoViableAltException(this);
                        }
                    }
                        break;
                    case 2: {
                        this.state = 234;
                        this.expression(0);
                        this.state = 235;
                        this.match(MoonParser.T__20);
                        this.state = 236;
                        this.expression(0);
                    }
                        break;
                }
                this.state = 240;
                this.match(MoonParser.T__11);
                this.state = 241;
                this.blockStatement();
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public whileStatement(): WhileStatementContext {
        let localctx: WhileStatementContext = new WhileStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 36, MoonParser.RULE_whileStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 243;
                this.match(MoonParser.T__21);
                this.state = 244;
                this.match(MoonParser.T__10);
                this.state = 245;
                this.expression(0);
                this.state = 246;
                this.match(MoonParser.T__11);
                this.state = 247;
                this.blockStatement();
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public returnStatement(): ReturnStatementContext {
        let localctx: ReturnStatementContext = new ReturnStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 38, MoonParser.RULE_returnStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 249;
                this.match(MoonParser.T__22);
                this.state = 252;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 11:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70: {
                        this.state = 250;
                        this.expression(0);
                    }
                        break;
                    case 64:
                        // tslint:disable-next-line:no-empty
                    {
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public continueStatement(): ContinueStatementContext {
        let localctx: ContinueStatementContext = new ContinueStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 40, MoonParser.RULE_continueStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 254;
                this.match(MoonParser.T__23);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    // @RuleVersion(0)
    public breakStatement(): BreakStatementContext {
        let localctx: BreakStatementContext = new BreakStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 42, MoonParser.RULE_breakStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 256;
                this.match(MoonParser.T__24);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    public expression(): ExpressionContext;
    public expression(_p: number): ExpressionContext;
    // @RuleVersion(0)
    public expression(_p?: number): ExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState);
        let _prevctx: ExpressionContext = localctx;
        let _startState: number = 44;
        this.enterRecursionRule(localctx, 44, MoonParser.RULE_expression, _p);
        let _la: number;
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 275;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31: {
                        this.state = 259;
                        _la = this._input.LA(1);
                        if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4227858432) !== 0))) {
                            this._errHandler.recoverInline(this);
                        } else {
                            this._errHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 260;
                        this.expression(14);
                    }
                        break;
                    case 11:
                    case 48:
                    case 69: {
                        this.state = 268;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 48: {
                                this.state = 261;
                                this.match(MoonParser.T__47);
                                this.state = 262;
                                this.match(MoonParser.ID);
                            }
                                break;
                            case 69: {
                                this.state = 263;
                                this.match(MoonParser.ID);
                            }
                                break;
                            case 11: {
                                this.state = 264;
                                this.match(MoonParser.T__10);
                                this.state = 265;
                                this.expression(0);
                                this.state = 266;
                                this.match(MoonParser.T__11);
                            }
                                break;
                            default:
                                throw new NoViableAltException(this);
                        }
                        this.state = 272;
                        this._errHandler.sync(this);
                        switch (this._interp.adaptivePredict(this._input, 23, this._ctx)) {
                            case 1: {
                                this.state = 270;
                                this.accessExpression(0);
                            }
                                break;
                            case 2:
                                // tslint:disable-next-line:no-empty
                            {
                            }
                                break;
                        }
                    }
                        break;
                    case 49:
                    case 50:
                    case 51:
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 70: {
                        this.state = 274;
                        _la = this._input.LA(1);
                        if (!(((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 3080199) !== 0))) {
                            this._errHandler.recoverInline(this);
                        } else {
                            this._errHandler.reportMatch(this);
                            this.consume();
                        }
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 317;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            this.state = 315;
                            this._errHandler.sync(this);
                            switch (this._interp.adaptivePredict(this._input, 25, this._ctx)) {
                                case 1: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 277;
                                    if (!(this.precpred(this._ctx, 13))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
                                    }
                                    this.state = 278;
                                    _la = this._input.LA(1);
                                    if (!(((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 7) !== 0))) {
                                        this._errHandler.recoverInline(this);
                                    } else {
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                    this.state = 279;
                                    this.expression(14);
                                }
                                    break;
                                case 2: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 280;
                                    if (!(this.precpred(this._ctx, 12))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
                                    }
                                    this.state = 281;
                                    _la = this._input.LA(1);
                                    if (!(_la === 30 || _la === 31)) {
                                        this._errHandler.recoverInline(this);
                                    } else {
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                    this.state = 282;
                                    this.expression(13);
                                }
                                    break;
                                case 3: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 283;
                                    if (!(this.precpred(this._ctx, 11))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
                                    }
                                    this.state = 284;
                                    _la = this._input.LA(1);
                                    if (!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 15) !== 0))) {
                                        this._errHandler.recoverInline(this);
                                    } else {
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                    this.state = 285;
                                    this.expression(12);
                                }
                                    break;
                                case 4: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 286;
                                    if (!(this.precpred(this._ctx, 10))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
                                    }
                                    this.state = 287;
                                    _la = this._input.LA(1);
                                    if (!(_la === 39 || _la === 40)) {
                                        this._errHandler.recoverInline(this);
                                    } else {
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                    this.state = 288;
                                    this.expression(11);
                                }
                                    break;
                                case 5: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 289;
                                    if (!(this.precpred(this._ctx, 9))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
                                    }
                                    this.state = 290;
                                    this.match(MoonParser.T__40);
                                    this.state = 291;
                                    this.expression(10);
                                }
                                    break;
                                case 6: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 292;
                                    if (!(this.precpred(this._ctx, 8))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
                                    }
                                    this.state = 293;
                                    this.match(MoonParser.T__41);
                                    this.state = 294;
                                    this.expression(9);
                                }
                                    break;
                                case 7: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 295;
                                    if (!(this.precpred(this._ctx, 7))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
                                    }
                                    this.state = 296;
                                    this.match(MoonParser.T__42);
                                    this.state = 297;
                                    this.expression(8);
                                }
                                    break;
                                case 8: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 298;
                                    if (!(this.precpred(this._ctx, 6))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
                                    }
                                    this.state = 299;
                                    this.match(MoonParser.T__43);
                                    this.state = 300;
                                    this.expression(7);
                                }
                                    break;
                                case 9: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 301;
                                    if (!(this.precpred(this._ctx, 5))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
                                    }
                                    this.state = 302;
                                    this.match(MoonParser.T__44);
                                    this.state = 303;
                                    this.expression(6);
                                }
                                    break;
                                case 10: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 304;
                                    if (!(this.precpred(this._ctx, 4))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
                                    }
                                    this.state = 305;
                                    this.match(MoonParser.T__45);
                                    this.state = 306;
                                    this.expression(0);
                                    this.state = 307;
                                    this.match(MoonParser.T__46);
                                    this.state = 308;
                                    this.expression(4);
                                }
                                    break;
                                case 11: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 310;
                                    if (!(this.precpred(this._ctx, 1))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
                                    }
                                    this.state = 311;
                                    _la = this._input.LA(1);
                                    if (!(_la === 9 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 255) !== 0))) {
                                        this._errHandler.recoverInline(this);
                                    } else {
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                    this.state = 312;
                                    this.expression(1);
                                }
                                    break;
                                case 12: {
                                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                                    this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_expression);
                                    this.state = 313;
                                    if (!(this.precpred(this._ctx, 15))) {
                                        throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
                                    }
                                    this.state = 314;
                                    _la = this._input.LA(1);
                                    if (!(_la === 26 || _la === 27)) {
                                        this._errHandler.recoverInline(this);
                                    } else {
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                }
                                    break;
                            }
                        }
                    }
                    this.state = 319;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    public accessExpression(): AccessExpressionContext;
    public accessExpression(_p: number): AccessExpressionContext;
    // @RuleVersion(0)
    public accessExpression(_p?: number): AccessExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let localctx: AccessExpressionContext = new AccessExpressionContext(this, this._ctx, _parentState);
        let _prevctx: AccessExpressionContext = localctx;
        let _startState: number = 46;
        this.enterRecursionRule(localctx, 46, MoonParser.RULE_accessExpression, _p);
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 333;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 60: {
                        this.state = 321;
                        this.match(MoonParser.T__59);
                        this.state = 322;
                        this.expression(0);
                        this.state = 323;
                        this.match(MoonParser.T__60);
                    }
                        break;
                    case 11: {
                        this.state = 325;
                        this.match(MoonParser.T__10);
                        this.state = 328;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 11:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 65:
                            case 66:
                            case 67:
                            case 68:
                            case 69:
                            case 70: {
                                this.state = 326;
                                this.arguments(0);
                            }
                                break;
                            case 12:
                                // tslint:disable-next-line:no-empty
                            {
                            }
                                break;
                            default:
                                throw new NoViableAltException(this);
                        }
                        this.state = 330;
                        this.match(MoonParser.T__11);
                    }
                        break;
                    case 62: {
                        this.state = 331;
                        this.match(MoonParser.T__61);
                        this.state = 332;
                        this.match(MoonParser.ID);
                    }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 339;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            {
                                localctx = new AccessExpressionContext(this, _parentctx, _parentState);
                                this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_accessExpression);
                                this.state = 335;
                                if (!(this.precpred(this._ctx, 4))) {
                                    throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
                                }
                                this.state = 336;
                                this.accessExpression(5);
                            }
                        }
                    }
                    this.state = 341;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    public arguments(): ArgumentsContext;
    public arguments(_p: number): ArgumentsContext;
    // @RuleVersion(0)
    public arguments(_p?: number): ArgumentsContext {
        if (_p === undefined) {
            _p = 0;
        }

        let _parentctx: ParserRuleContext = this._ctx;
        let _parentState: number = this.state;
        let localctx: ArgumentsContext = new ArgumentsContext(this, this._ctx, _parentState);
        let _prevctx: ArgumentsContext = localctx;
        let _startState: number = 48;
        this.enterRecursionRule(localctx, 48, MoonParser.RULE_arguments, _p);
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                {
                    this.state = 343;
                    this.expression(0);
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 350;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            {
                                localctx = new ArgumentsContext(this, _parentctx, _parentState);
                                this.pushNewRecursionContext(localctx, _startState, MoonParser.RULE_arguments);
                                this.state = 345;
                                if (!(this.precpred(this._ctx, 2))) {
                                    throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
                                }
                                this.state = 346;
                                this.match(MoonParser.T__12);
                                this.state = 347;
                                this.arguments(3);
                            }
                        }
                    }
                    this.state = 352;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }

    public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
            case 1:
                return this.declarations_sempred(localctx as DeclarationsContext, predIndex);
            case 3:
                return this.members_sempred(localctx as MembersContext, predIndex);
            case 7:
                return this.params_sempred(localctx as ParamsContext, predIndex);
            case 8:
                return this.statements_sempred(localctx as StatementsContext, predIndex);
            case 15:
                return this.multiIfStatement_sempred(localctx as MultiIfStatementContext, predIndex);
            case 22:
                return this.expression_sempred(localctx as ExpressionContext, predIndex);
            case 23:
                return this.accessExpression_sempred(localctx as AccessExpressionContext, predIndex);
            case 24:
                return this.arguments_sempred(localctx as ArgumentsContext, predIndex);
        }
        return true;
    }

    private declarations_sempred(localctx: DeclarationsContext, predIndex: number): boolean {
        switch (predIndex) {
            case 0:
                return this.precpred(this._ctx, 4);
        }
        return true;
    }

    private members_sempred(localctx: MembersContext, predIndex: number): boolean {
        switch (predIndex) {
            case 1:
                return this.precpred(this._ctx, 2);
        }
        return true;
    }

    private params_sempred(localctx: ParamsContext, predIndex: number): boolean {
        switch (predIndex) {
            case 2:
                return this.precpred(this._ctx, 2);
        }
        return true;
    }

    private statements_sempred(localctx: StatementsContext, predIndex: number): boolean {
        switch (predIndex) {
            case 3:
                return this.precpred(this._ctx, 12);
        }
        return true;
    }

    private multiIfStatement_sempred(localctx: MultiIfStatementContext, predIndex: number): boolean {
        switch (predIndex) {
            case 4:
                return this.precpred(this._ctx, 2);
        }
        return true;
    }

    private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
        switch (predIndex) {
            case 5:
                return this.precpred(this._ctx, 13);
            case 6:
                return this.precpred(this._ctx, 12);
            case 7:
                return this.precpred(this._ctx, 11);
            case 8:
                return this.precpred(this._ctx, 10);
            case 9:
                return this.precpred(this._ctx, 9);
            case 10:
                return this.precpred(this._ctx, 8);
            case 11:
                return this.precpred(this._ctx, 7);
            case 12:
                return this.precpred(this._ctx, 6);
            case 13:
                return this.precpred(this._ctx, 5);
            case 14:
                return this.precpred(this._ctx, 4);
            case 15:
                return this.precpred(this._ctx, 1);
            case 16:
                return this.precpred(this._ctx, 15);
        }
        return true;
    }

    private accessExpression_sempred(localctx: AccessExpressionContext, predIndex: number): boolean {
        switch (predIndex) {
            case 17:
                return this.precpred(this._ctx, 4);
        }
        return true;
    }

    private arguments_sempred(localctx: ArgumentsContext, predIndex: number): boolean {
        switch (predIndex) {
            case 18:
                return this.precpred(this._ctx, 2);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [4, 1, 72, 354, 2, 0, 7, 0, 2,
        1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2,
        10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7, 16, 2, 17,
        7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7, 20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24, 7,
        24, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 60, 8, 1, 1, 1, 1, 1, 5, 1, 64, 8, 1, 10,
        1, 12, 1, 67, 9, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 74, 8, 2, 1, 2, 1, 2, 1, 2, 3, 2, 79, 8, 2, 1, 2,
        1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 5, 3, 88, 8, 3, 10, 3, 12, 3, 91, 9, 3, 1, 4, 1, 4, 1, 4, 1, 4, 3, 4,
        97, 8, 4, 1, 4, 1, 4, 3, 4, 101, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 3, 4, 107, 8, 4, 1, 5, 1, 5, 1, 5, 1, 5,
        1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 3, 6, 118, 8, 6, 1, 6, 1, 6, 3, 6, 122, 8, 6, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7,
        1, 7, 1, 7, 1, 7, 5, 7, 132, 8, 7, 10, 7, 12, 7, 135, 9, 7, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1,
        8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 3, 8, 159, 8, 8, 1,
        8, 1, 8, 5, 8, 163, 8, 8, 10, 8, 12, 8, 166, 9, 8, 1, 9, 1, 9, 1, 9, 3, 9, 171, 8, 9, 1, 9, 1, 9, 1, 10,
        1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 3, 10, 182, 8, 10, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1,
        11, 1, 12, 1, 12, 1, 12, 1, 13, 1, 13, 1, 13, 1, 14, 1, 14, 1, 14, 1, 15, 1, 15, 1, 15, 1, 15, 1, 15,
        1, 15, 1, 15, 1, 15, 1, 15, 1, 15, 5, 15, 209, 8, 15, 10, 15, 12, 15, 212, 9, 15, 1, 16, 1, 16, 1,
        16, 3, 16, 217, 8, 16, 1, 17, 1, 17, 1, 17, 1, 17, 3, 17, 223, 8, 17, 1, 17, 1, 17, 1, 17, 3, 17,
        228, 8, 17, 1, 17, 1, 17, 1, 17, 3, 17, 233, 8, 17, 1, 17, 1, 17, 1, 17, 1, 17, 3, 17, 239, 8, 17,
        1, 17, 1, 17, 1, 17, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 1, 19, 1, 19, 1, 19, 3, 19, 253, 8,
        19, 1, 20, 1, 20, 1, 21, 1, 21, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22,
        3, 22, 269, 8, 22, 1, 22, 1, 22, 3, 22, 273, 8, 22, 1, 22, 3, 22, 276, 8, 22, 1, 22, 1, 22, 1, 22,
        1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1,
        22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22,
        1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 5, 22, 316, 8, 22, 10, 22, 12, 22, 319, 9, 22, 1, 23, 1,
        23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 1, 23, 3, 23, 329, 8, 23, 1, 23, 1, 23, 1, 23, 3, 23, 334,
        8, 23, 1, 23, 1, 23, 5, 23, 338, 8, 23, 10, 23, 12, 23, 341, 9, 23, 1, 24, 1, 24, 1, 24, 1, 24, 1,
        24, 1, 24, 5, 24, 349, 8, 24, 10, 24, 12, 24, 352, 9, 24, 1, 24, 0, 8, 2, 6, 14, 16, 30, 44, 46,
        48, 25, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
        48, 0, 8, 1, 0, 26, 31, 3, 0, 49, 51, 65, 68, 70, 70, 1, 0, 32, 34, 1, 0, 30, 31, 1, 0, 35, 38, 1,
        0, 39, 40, 2, 0, 9, 9, 52, 59, 1, 0, 26, 27, 385, 0, 50, 1, 0, 0, 0, 2, 59, 1, 0, 0, 0, 4, 68, 1, 0,
        0, 0, 6, 82, 1, 0, 0, 0, 8, 96, 1, 0, 0, 0, 10, 108, 1, 0, 0, 0, 12, 112, 1, 0, 0, 0, 14, 125, 1, 0,
        0, 0, 16, 158, 1, 0, 0, 0, 18, 167, 1, 0, 0, 0, 20, 174, 1, 0, 0, 0, 22, 183, 1, 0, 0, 0, 24, 189,
        1, 0, 0, 0, 26, 192, 1, 0, 0, 0, 28, 195, 1, 0, 0, 0, 30, 198, 1, 0, 0, 0, 32, 216, 1, 0, 0, 0, 34,
        218, 1, 0, 0, 0, 36, 243, 1, 0, 0, 0, 38, 249, 1, 0, 0, 0, 40, 254, 1, 0, 0, 0, 42, 256, 1, 0, 0, 0,
        44, 275, 1, 0, 0, 0, 46, 333, 1, 0, 0, 0, 48, 342, 1, 0, 0, 0, 50, 51, 3, 2, 1, 0, 51, 52, 5, 0, 0,
        1, 52, 1, 1, 0, 0, 0, 53, 54, 6, 1, -1, 0, 54, 60, 3, 4, 2, 0, 55, 60, 3, 12, 6, 0, 56, 57, 3, 10, 5,
        0, 57, 58, 5, 64, 0, 0, 58, 60, 1, 0, 0, 0, 59, 53, 1, 0, 0, 0, 59, 55, 1, 0, 0, 0, 59, 56, 1, 0, 0,
        0, 60, 65, 1, 0, 0, 0, 61, 62, 10, 4, 0, 0, 62, 64, 3, 2, 1, 5, 63, 61, 1, 0, 0, 0, 64, 67, 1, 0, 0,
        0, 65, 63, 1, 0, 0, 0, 65, 66, 1, 0, 0, 0, 66, 3, 1, 0, 0, 0, 67, 65, 1, 0, 0, 0, 68, 69, 5, 1, 0, 0,
        69, 73, 5, 69, 0, 0, 70, 71, 5, 2, 0, 0, 71, 74, 5, 69, 0, 0, 72, 74, 1, 0, 0, 0, 73, 70, 1, 0, 0, 0,
        73, 72, 1, 0, 0, 0, 74, 75, 1, 0, 0, 0, 75, 78, 5, 3, 0, 0, 76, 79, 3, 6, 3, 0, 77, 79, 1, 0, 0, 0, 78,
        76, 1, 0, 0, 0, 78, 77, 1, 0, 0, 0, 79, 80, 1, 0, 0, 0, 80, 81, 5, 4, 0, 0, 81, 5, 1, 0, 0, 0, 82, 83,
        6, 3, -1, 0, 83, 84, 3, 8, 4, 0, 84, 89, 1, 0, 0, 0, 85, 86, 10, 2, 0, 0, 86, 88, 3, 6, 3, 3, 87, 85,
        1, 0, 0, 0, 88, 91, 1, 0, 0, 0, 89, 87, 1, 0, 0, 0, 89, 90, 1, 0, 0, 0, 90, 7, 1, 0, 0, 0, 91, 89, 1,
        0, 0, 0, 92, 97, 5, 5, 0, 0, 93, 97, 5, 6, 0, 0, 94, 97, 5, 7, 0, 0, 95, 97, 1, 0, 0, 0, 96, 92, 1, 0,
        0, 0, 96, 93, 1, 0, 0, 0, 96, 94, 1, 0, 0, 0, 96, 95, 1, 0, 0, 0, 97, 100, 1, 0, 0, 0, 98, 101, 5, 8,
        0, 0, 99, 101, 1, 0, 0, 0, 100, 98, 1, 0, 0, 0, 100, 99, 1, 0, 0, 0, 101, 106, 1, 0, 0, 0, 102, 107,
        3, 12, 6, 0, 103, 104, 3, 10, 5, 0, 104, 105, 5, 64, 0, 0, 105, 107, 1, 0, 0, 0, 106, 102, 1, 0,
        0, 0, 106, 103, 1, 0, 0, 0, 107, 9, 1, 0, 0, 0, 108, 109, 5, 69, 0, 0, 109, 110, 5, 9, 0, 0, 110,
        111, 3, 44, 22, 0, 111, 11, 1, 0, 0, 0, 112, 113, 5, 10, 0, 0, 113, 121, 5, 69, 0, 0, 114, 117,
        5, 11, 0, 0, 115, 118, 3, 14, 7, 0, 116, 118, 1, 0, 0, 0, 117, 115, 1, 0, 0, 0, 117, 116, 1, 0, 0,
        0, 118, 119, 1, 0, 0, 0, 119, 122, 5, 12, 0, 0, 120, 122, 1, 0, 0, 0, 121, 114, 1, 0, 0, 0, 121,
        120, 1, 0, 0, 0, 122, 123, 1, 0, 0, 0, 123, 124, 3, 18, 9, 0, 124, 13, 1, 0, 0, 0, 125, 126, 6, 7,
        -1, 0, 126, 127, 5, 69, 0, 0, 127, 133, 1, 0, 0, 0, 128, 129, 10, 2, 0, 0, 129, 130, 5, 13, 0, 0,
        130, 132, 3, 14, 7, 3, 131, 128, 1, 0, 0, 0, 132, 135, 1, 0, 0, 0, 133, 131, 1, 0, 0, 0, 133, 134,
        1, 0, 0, 0, 134, 15, 1, 0, 0, 0, 135, 133, 1, 0, 0, 0, 136, 137, 6, 8, -1, 0, 137, 138, 3, 44, 22,
        0, 138, 139, 5, 64, 0, 0, 139, 159, 1, 0, 0, 0, 140, 159, 3, 28, 14, 0, 141, 159, 3, 34, 17, 0,
        142, 159, 3, 36, 18, 0, 143, 159, 3, 20, 10, 0, 144, 145, 3, 38, 19, 0, 145, 146, 5, 64, 0, 0,
        146, 159, 1, 0, 0, 0, 147, 148, 3, 40, 20, 0, 148, 149, 5, 64, 0, 0, 149, 159, 1, 0, 0, 0, 150,
        151, 3, 42, 21, 0, 151, 152, 5, 64, 0, 0, 152, 159, 1, 0, 0, 0, 153, 154, 3, 26, 13, 0, 154, 155,
        5, 64, 0, 0, 155, 159, 1, 0, 0, 0, 156, 159, 3, 18, 9, 0, 157, 159, 5, 64, 0, 0, 158, 136, 1, 0,
        0, 0, 158, 140, 1, 0, 0, 0, 158, 141, 1, 0, 0, 0, 158, 142, 1, 0, 0, 0, 158, 143, 1, 0, 0, 0, 158,
        144, 1, 0, 0, 0, 158, 147, 1, 0, 0, 0, 158, 150, 1, 0, 0, 0, 158, 153, 1, 0, 0, 0, 158, 156, 1, 0,
        0, 0, 158, 157, 1, 0, 0, 0, 159, 164, 1, 0, 0, 0, 160, 161, 10, 12, 0, 0, 161, 163, 3, 16, 8, 13,
        162, 160, 1, 0, 0, 0, 163, 166, 1, 0, 0, 0, 164, 162, 1, 0, 0, 0, 164, 165, 1, 0, 0, 0, 165, 17,
        1, 0, 0, 0, 166, 164, 1, 0, 0, 0, 167, 170, 5, 3, 0, 0, 168, 171, 3, 16, 8, 0, 169, 171, 1, 0, 0,
        0, 170, 168, 1, 0, 0, 0, 170, 169, 1, 0, 0, 0, 171, 172, 1, 0, 0, 0, 172, 173, 5, 4, 0, 0, 173, 19,
        1, 0, 0, 0, 174, 175, 5, 14, 0, 0, 175, 181, 3, 18, 9, 0, 176, 177, 3, 22, 11, 0, 177, 178, 3, 24,
        12, 0, 178, 182, 1, 0, 0, 0, 179, 182, 3, 22, 11, 0, 180, 182, 3, 24, 12, 0, 181, 176, 1, 0, 0,
        0, 181, 179, 1, 0, 0, 0, 181, 180, 1, 0, 0, 0, 182, 21, 1, 0, 0, 0, 183, 184, 5, 15, 0, 0, 184, 185,
        5, 11, 0, 0, 185, 186, 5, 69, 0, 0, 186, 187, 5, 12, 0, 0, 187, 188, 3, 18, 9, 0, 188, 23, 1, 0,
        0, 0, 189, 190, 5, 16, 0, 0, 190, 191, 3, 18, 9, 0, 191, 25, 1, 0, 0, 0, 192, 193, 5, 17, 0, 0, 193,
        194, 3, 44, 22, 0, 194, 27, 1, 0, 0, 0, 195, 196, 3, 30, 15, 0, 196, 197, 3, 32, 16, 0, 197, 29,
        1, 0, 0, 0, 198, 199, 6, 15, -1, 0, 199, 200, 5, 19, 0, 0, 200, 201, 5, 11, 0, 0, 201, 202, 3, 44,
        22, 0, 202, 203, 5, 12, 0, 0, 203, 204, 3, 18, 9, 0, 204, 210, 1, 0, 0, 0, 205, 206, 10, 2, 0, 0,
        206, 207, 5, 18, 0, 0, 207, 209, 3, 30, 15, 3, 208, 205, 1, 0, 0, 0, 209, 212, 1, 0, 0, 0, 210,
        208, 1, 0, 0, 0, 210, 211, 1, 0, 0, 0, 211, 31, 1, 0, 0, 0, 212, 210, 1, 0, 0, 0, 213, 214, 5, 18,
        0, 0, 214, 217, 3, 18, 9, 0, 215, 217, 1, 0, 0, 0, 216, 213, 1, 0, 0, 0, 216, 215, 1, 0, 0, 0, 217,
        33, 1, 0, 0, 0, 218, 219, 5, 20, 0, 0, 219, 238, 5, 11, 0, 0, 220, 223, 3, 44, 22, 0, 221, 223,
        1, 0, 0, 0, 222, 220, 1, 0, 0, 0, 222, 221, 1, 0, 0, 0, 223, 224, 1, 0, 0, 0, 224, 227, 5, 64, 0,
        0, 225, 228, 3, 44, 22, 0, 226, 228, 1, 0, 0, 0, 227, 225, 1, 0, 0, 0, 227, 226, 1, 0, 0, 0, 228,
        229, 1, 0, 0, 0, 229, 232, 5, 64, 0, 0, 230, 233, 3, 44, 22, 0, 231, 233, 1, 0, 0, 0, 232, 230,
        1, 0, 0, 0, 232, 231, 1, 0, 0, 0, 233, 239, 1, 0, 0, 0, 234, 235, 3, 44, 22, 0, 235, 236, 5, 21,
        0, 0, 236, 237, 3, 44, 22, 0, 237, 239, 1, 0, 0, 0, 238, 222, 1, 0, 0, 0, 238, 234, 1, 0, 0, 0, 239,
        240, 1, 0, 0, 0, 240, 241, 5, 12, 0, 0, 241, 242, 3, 18, 9, 0, 242, 35, 1, 0, 0, 0, 243, 244, 5,
        22, 0, 0, 244, 245, 5, 11, 0, 0, 245, 246, 3, 44, 22, 0, 246, 247, 5, 12, 0, 0, 247, 248, 3, 18,
        9, 0, 248, 37, 1, 0, 0, 0, 249, 252, 5, 23, 0, 0, 250, 253, 3, 44, 22, 0, 251, 253, 1, 0, 0, 0, 252,
        250, 1, 0, 0, 0, 252, 251, 1, 0, 0, 0, 253, 39, 1, 0, 0, 0, 254, 255, 5, 24, 0, 0, 255, 41, 1, 0,
        0, 0, 256, 257, 5, 25, 0, 0, 257, 43, 1, 0, 0, 0, 258, 259, 6, 22, -1, 0, 259, 260, 7, 0, 0, 0, 260,
        276, 3, 44, 22, 14, 261, 262, 5, 48, 0, 0, 262, 269, 5, 69, 0, 0, 263, 269, 5, 69, 0, 0, 264, 265,
        5, 11, 0, 0, 265, 266, 3, 44, 22, 0, 266, 267, 5, 12, 0, 0, 267, 269, 1, 0, 0, 0, 268, 261, 1, 0,
        0, 0, 268, 263, 1, 0, 0, 0, 268, 264, 1, 0, 0, 0, 269, 272, 1, 0, 0, 0, 270, 273, 3, 46, 23, 0, 271,
        273, 1, 0, 0, 0, 272, 270, 1, 0, 0, 0, 272, 271, 1, 0, 0, 0, 273, 276, 1, 0, 0, 0, 274, 276, 7, 1,
        0, 0, 275, 258, 1, 0, 0, 0, 275, 268, 1, 0, 0, 0, 275, 274, 1, 0, 0, 0, 276, 317, 1, 0, 0, 0, 277,
        278, 10, 13, 0, 0, 278, 279, 7, 2, 0, 0, 279, 316, 3, 44, 22, 14, 280, 281, 10, 12, 0, 0, 281,
        282, 7, 3, 0, 0, 282, 316, 3, 44, 22, 13, 283, 284, 10, 11, 0, 0, 284, 285, 7, 4, 0, 0, 285, 316,
        3, 44, 22, 12, 286, 287, 10, 10, 0, 0, 287, 288, 7, 5, 0, 0, 288, 316, 3, 44, 22, 11, 289, 290,
        10, 9, 0, 0, 290, 291, 5, 41, 0, 0, 291, 316, 3, 44, 22, 10, 292, 293, 10, 8, 0, 0, 293, 294, 5,
        42, 0, 0, 294, 316, 3, 44, 22, 9, 295, 296, 10, 7, 0, 0, 296, 297, 5, 43, 0, 0, 297, 316, 3, 44,
        22, 8, 298, 299, 10, 6, 0, 0, 299, 300, 5, 44, 0, 0, 300, 316, 3, 44, 22, 7, 301, 302, 10, 5, 0,
        0, 302, 303, 5, 45, 0, 0, 303, 316, 3, 44, 22, 6, 304, 305, 10, 4, 0, 0, 305, 306, 5, 46, 0, 0,
        306, 307, 3, 44, 22, 0, 307, 308, 5, 47, 0, 0, 308, 309, 3, 44, 22, 4, 309, 316, 1, 0, 0, 0, 310,
        311, 10, 1, 0, 0, 311, 312, 7, 6, 0, 0, 312, 316, 3, 44, 22, 1, 313, 314, 10, 15, 0, 0, 314, 316,
        7, 7, 0, 0, 315, 277, 1, 0, 0, 0, 315, 280, 1, 0, 0, 0, 315, 283, 1, 0, 0, 0, 315, 286, 1, 0, 0, 0,
        315, 289, 1, 0, 0, 0, 315, 292, 1, 0, 0, 0, 315, 295, 1, 0, 0, 0, 315, 298, 1, 0, 0, 0, 315, 301,
        1, 0, 0, 0, 315, 304, 1, 0, 0, 0, 315, 310, 1, 0, 0, 0, 315, 313, 1, 0, 0, 0, 316, 319, 1, 0, 0, 0,
        317, 315, 1, 0, 0, 0, 317, 318, 1, 0, 0, 0, 318, 45, 1, 0, 0, 0, 319, 317, 1, 0, 0, 0, 320, 321,
        6, 23, -1, 0, 321, 322, 5, 60, 0, 0, 322, 323, 3, 44, 22, 0, 323, 324, 5, 61, 0, 0, 324, 334, 1,
        0, 0, 0, 325, 328, 5, 11, 0, 0, 326, 329, 3, 48, 24, 0, 327, 329, 1, 0, 0, 0, 328, 326, 1, 0, 0,
        0, 328, 327, 1, 0, 0, 0, 329, 330, 1, 0, 0, 0, 330, 334, 5, 12, 0, 0, 331, 332, 5, 62, 0, 0, 332,
        334, 5, 69, 0, 0, 333, 320, 1, 0, 0, 0, 333, 325, 1, 0, 0, 0, 333, 331, 1, 0, 0, 0, 334, 339, 1,
        0, 0, 0, 335, 336, 10, 4, 0, 0, 336, 338, 3, 46, 23, 5, 337, 335, 1, 0, 0, 0, 338, 341, 1, 0, 0,
        0, 339, 337, 1, 0, 0, 0, 339, 340, 1, 0, 0, 0, 340, 47, 1, 0, 0, 0, 341, 339, 1, 0, 0, 0, 342, 343,
        6, 24, -1, 0, 343, 344, 3, 44, 22, 0, 344, 350, 1, 0, 0, 0, 345, 346, 10, 2, 0, 0, 346, 347, 5,
        13, 0, 0, 347, 349, 3, 48, 24, 3, 348, 345, 1, 0, 0, 0, 349, 352, 1, 0, 0, 0, 350, 348, 1, 0, 0,
        0, 350, 351, 1, 0, 0, 0, 351, 49, 1, 0, 0, 0, 352, 350, 1, 0, 0, 0, 31, 59, 65, 73, 78, 89, 96, 100,
        106, 117, 121, 133, 158, 164, 170, 181, 210, 216, 222, 227, 232, 238, 252, 268, 272, 275,
        315, 317, 328, 333, 339, 350];

    private static __ATN: ATN;
    public static get _ATN(): ATN {
        if (!MoonParser.__ATN) {
            MoonParser.__ATN = new ATNDeserializer().deserialize(MoonParser._serializedATN);
        }

        return MoonParser.__ATN;
    }


    static DecisionsToDFA = MoonParser._ATN.decisionToState.map((ds: DecisionState, index: number) => new DFA(ds, index));

}

export class ProgramContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public declarations(): DeclarationsContext {
        return this.getTypedRuleContext(DeclarationsContext, 0) as DeclarationsContext;
    }

    public EOF(): TerminalNode {
        return this.getToken(MoonParser.EOF, 0);
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_program;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterProgram) {
            listener.enterProgram(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitProgram) {
            listener.exitProgram(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeclarationsContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public classDeclaration(): ClassDeclarationContext {
        return this.getTypedRuleContext(ClassDeclarationContext, 0) as ClassDeclarationContext;
    }

    public functionDeclaration(): FunctionDeclarationContext {
        return this.getTypedRuleContext(FunctionDeclarationContext, 0) as FunctionDeclarationContext;
    }

    public variableDeclaration(): VariableDeclarationContext {
        return this.getTypedRuleContext(VariableDeclarationContext, 0) as VariableDeclarationContext;
    }

    public SEMI(): TerminalNode {
        return this.getToken(MoonParser.SEMI, 0);
    }

    public declarations_list(): DeclarationsContext[] {
        return this.getTypedRuleContexts(DeclarationsContext) as DeclarationsContext[];
    }

    public declarations(i: number): DeclarationsContext {
        return this.getTypedRuleContext(DeclarationsContext, i) as DeclarationsContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_declarations;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterDeclarations) {
            listener.enterDeclarations(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitDeclarations) {
            listener.exitDeclarations(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitDeclarations) {
            return visitor.visitDeclarations(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ClassDeclarationContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public ID_list(): TerminalNode[] {
        return this.getTokens(MoonParser.ID);
    }

    public ID(i: number): TerminalNode {
        return this.getToken(MoonParser.ID, i);
    }

    public members(): MembersContext {
        return this.getTypedRuleContext(MembersContext, 0) as MembersContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_classDeclaration;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterClassDeclaration) {
            listener.enterClassDeclaration(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitClassDeclaration) {
            listener.exitClassDeclaration(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitClassDeclaration) {
            return visitor.visitClassDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MembersContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public member(): MemberContext {
        return this.getTypedRuleContext(MemberContext, 0) as MemberContext;
    }

    public members_list(): MembersContext[] {
        return this.getTypedRuleContexts(MembersContext) as MembersContext[];
    }

    public members(i: number): MembersContext {
        return this.getTypedRuleContext(MembersContext, i) as MembersContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_members;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterMembers) {
            listener.enterMembers(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitMembers) {
            listener.exitMembers(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitMembers) {
            return visitor.visitMembers(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MemberContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public functionDeclaration(): FunctionDeclarationContext {
        return this.getTypedRuleContext(FunctionDeclarationContext, 0) as FunctionDeclarationContext;
    }

    public variableDeclaration(): VariableDeclarationContext {
        return this.getTypedRuleContext(VariableDeclarationContext, 0) as VariableDeclarationContext;
    }

    public SEMI(): TerminalNode {
        return this.getToken(MoonParser.SEMI, 0);
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_member;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterMember) {
            listener.enterMember(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitMember) {
            listener.exitMember(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitMember) {
            return visitor.visitMember(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableDeclarationContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public ID(): TerminalNode {
        return this.getToken(MoonParser.ID, 0);
    }

    public expression(): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_variableDeclaration;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterVariableDeclaration) {
            listener.enterVariableDeclaration(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitVariableDeclaration) {
            listener.exitVariableDeclaration(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitVariableDeclaration) {
            return visitor.visitVariableDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionDeclarationContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public ID(): TerminalNode {
        return this.getToken(MoonParser.ID, 0);
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public params(): ParamsContext {
        return this.getTypedRuleContext(ParamsContext, 0) as ParamsContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_functionDeclaration;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterFunctionDeclaration) {
            listener.enterFunctionDeclaration(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitFunctionDeclaration) {
            listener.exitFunctionDeclaration(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitFunctionDeclaration) {
            return visitor.visitFunctionDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParamsContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public ID(): TerminalNode {
        return this.getToken(MoonParser.ID, 0);
    }

    public params_list(): ParamsContext[] {
        return this.getTypedRuleContexts(ParamsContext) as ParamsContext[];
    }

    public params(i: number): ParamsContext {
        return this.getTypedRuleContext(ParamsContext, i) as ParamsContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_params;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterParams) {
            listener.enterParams(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitParams) {
            listener.exitParams(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitParams) {
            return visitor.visitParams(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementsContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public expression(): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
    }

    public SEMI(): TerminalNode {
        return this.getToken(MoonParser.SEMI, 0);
    }

    public ifStatement(): IfStatementContext {
        return this.getTypedRuleContext(IfStatementContext, 0) as IfStatementContext;
    }

    public forStatement(): ForStatementContext {
        return this.getTypedRuleContext(ForStatementContext, 0) as ForStatementContext;
    }

    public whileStatement(): WhileStatementContext {
        return this.getTypedRuleContext(WhileStatementContext, 0) as WhileStatementContext;
    }

    public tryStatement(): TryStatementContext {
        return this.getTypedRuleContext(TryStatementContext, 0) as TryStatementContext;
    }

    public returnStatement(): ReturnStatementContext {
        return this.getTypedRuleContext(ReturnStatementContext, 0) as ReturnStatementContext;
    }

    public continueStatement(): ContinueStatementContext {
        return this.getTypedRuleContext(ContinueStatementContext, 0) as ContinueStatementContext;
    }

    public breakStatement(): BreakStatementContext {
        return this.getTypedRuleContext(BreakStatementContext, 0) as BreakStatementContext;
    }

    public throwStatement(): ThrowStatementContext {
        return this.getTypedRuleContext(ThrowStatementContext, 0) as ThrowStatementContext;
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public statements_list(): StatementsContext[] {
        return this.getTypedRuleContexts(StatementsContext) as StatementsContext[];
    }

    public statements(i: number): StatementsContext {
        return this.getTypedRuleContext(StatementsContext, i) as StatementsContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_statements;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterStatements) {
            listener.enterStatements(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitStatements) {
            listener.exitStatements(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitStatements) {
            return visitor.visitStatements(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public statements(): StatementsContext {
        return this.getTypedRuleContext(StatementsContext, 0) as StatementsContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_blockStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterBlockStatement) {
            listener.enterBlockStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitBlockStatement) {
            listener.exitBlockStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitBlockStatement) {
            return visitor.visitBlockStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TryStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public catchClause(): CatchClauseContext {
        return this.getTypedRuleContext(CatchClauseContext, 0) as CatchClauseContext;
    }

    public finallyClause(): FinallyClauseContext {
        return this.getTypedRuleContext(FinallyClauseContext, 0) as FinallyClauseContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_tryStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterTryStatement) {
            listener.enterTryStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitTryStatement) {
            listener.exitTryStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitTryStatement) {
            return visitor.visitTryStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CatchClauseContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public ID(): TerminalNode {
        return this.getToken(MoonParser.ID, 0);
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_catchClause;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterCatchClause) {
            listener.enterCatchClause(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitCatchClause) {
            listener.exitCatchClause(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitCatchClause) {
            return visitor.visitCatchClause(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FinallyClauseContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_finallyClause;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterFinallyClause) {
            listener.enterFinallyClause(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitFinallyClause) {
            listener.exitFinallyClause(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitFinallyClause) {
            return visitor.visitFinallyClause(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ThrowStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public expression(): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_throwStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterThrowStatement) {
            listener.enterThrowStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitThrowStatement) {
            listener.exitThrowStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitThrowStatement) {
            return visitor.visitThrowStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IfStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public multiIfStatement(): MultiIfStatementContext {
        return this.getTypedRuleContext(MultiIfStatementContext, 0) as MultiIfStatementContext;
    }

    public elseStatement(): ElseStatementContext {
        return this.getTypedRuleContext(ElseStatementContext, 0) as ElseStatementContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_ifStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterIfStatement) {
            listener.enterIfStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitIfStatement) {
            listener.exitIfStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitIfStatement) {
            return visitor.visitIfStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MultiIfStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public expression(): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public multiIfStatement_list(): MultiIfStatementContext[] {
        return this.getTypedRuleContexts(MultiIfStatementContext) as MultiIfStatementContext[];
    }

    public multiIfStatement(i: number): MultiIfStatementContext {
        return this.getTypedRuleContext(MultiIfStatementContext, i) as MultiIfStatementContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_multiIfStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterMultiIfStatement) {
            listener.enterMultiIfStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitMultiIfStatement) {
            listener.exitMultiIfStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitMultiIfStatement) {
            return visitor.visitMultiIfStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElseStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_elseStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterElseStatement) {
            listener.enterElseStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitElseStatement) {
            listener.exitElseStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitElseStatement) {
            return visitor.visitElseStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ForStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public SEMI_list(): TerminalNode[] {
        return this.getTokens(MoonParser.SEMI);
    }

    public SEMI(i: number): TerminalNode {
        return this.getToken(MoonParser.SEMI, i);
    }

    public expression_list(): ExpressionContext[] {
        return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
    }

    public expression(i: number): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_forStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterForStatement) {
            listener.enterForStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitForStatement) {
            listener.exitForStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitForStatement) {
            return visitor.visitForStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WhileStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public expression(): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
    }

    public blockStatement(): BlockStatementContext {
        return this.getTypedRuleContext(BlockStatementContext, 0) as BlockStatementContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_whileStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterWhileStatement) {
            listener.enterWhileStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitWhileStatement) {
            listener.exitWhileStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitWhileStatement) {
            return visitor.visitWhileStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ReturnStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public expression(): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_returnStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterReturnStatement) {
            listener.enterReturnStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitReturnStatement) {
            listener.exitReturnStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitReturnStatement) {
            return visitor.visitReturnStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContinueStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_continueStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterContinueStatement) {
            listener.enterContinueStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitContinueStatement) {
            listener.exitContinueStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitContinueStatement) {
            return visitor.visitContinueStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BreakStatementContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_breakStatement;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterBreakStatement) {
            listener.enterBreakStatement(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitBreakStatement) {
            listener.exitBreakStatement(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitBreakStatement) {
            return visitor.visitBreakStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public expression_list(): ExpressionContext[] {
        return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
    }

    public expression(i: number): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
    }

    public ID(): TerminalNode {
        return this.getToken(MoonParser.ID, 0);
    }

    public accessExpression(): AccessExpressionContext {
        return this.getTypedRuleContext(AccessExpressionContext, 0) as AccessExpressionContext;
    }

    public NUMBER(): TerminalNode {
        return this.getToken(MoonParser.NUMBER, 0);
    }

    public HEX(): TerminalNode {
        return this.getToken(MoonParser.HEX, 0);
    }

    public OCT(): TerminalNode {
        return this.getToken(MoonParser.OCT, 0);
    }

    public BIN(): TerminalNode {
        return this.getToken(MoonParser.BIN, 0);
    }

    public STRING(): TerminalNode {
        return this.getToken(MoonParser.STRING, 0);
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_expression;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterExpression) {
            listener.enterExpression(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitExpression) {
            listener.exitExpression(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AccessExpressionContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public expression(): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
    }

    public arguments(): ArgumentsContext {
        return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
    }

    public ID(): TerminalNode {
        return this.getToken(MoonParser.ID, 0);
    }

    public accessExpression_list(): AccessExpressionContext[] {
        return this.getTypedRuleContexts(AccessExpressionContext) as AccessExpressionContext[];
    }

    public accessExpression(i: number): AccessExpressionContext {
        return this.getTypedRuleContext(AccessExpressionContext, i) as AccessExpressionContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_accessExpression;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterAccessExpression) {
            listener.enterAccessExpression(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitAccessExpression) {
            listener.exitAccessExpression(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitAccessExpression) {
            return visitor.visitAccessExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgumentsContext extends ParserRuleContext {
    constructor(parser?: MoonParser, parent?: ParserRuleContext, invokingState?: number) {
        super(parent, invokingState);
        this.parser = parser;
    }

    public expression(): ExpressionContext {
        return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
    }

    public arguments_list(): ArgumentsContext[] {
        return this.getTypedRuleContexts(ArgumentsContext) as ArgumentsContext[];
    }

    public arguments(i: number): ArgumentsContext {
        return this.getTypedRuleContext(ArgumentsContext, i) as ArgumentsContext;
    }

    public get ruleIndex(): number {
        return MoonParser.RULE_arguments;
    }

    public enterRule(listener: MoonListener): void {
        if (listener.enterArguments) {
            listener.enterArguments(this);
        }
    }

    public exitRule(listener: MoonListener): void {
        if (listener.exitArguments) {
            listener.exitArguments(this);
        }
    }

    // @Override
    public accept<Result>(visitor: MoonVisitor<Result>): Result {
        if (visitor.visitArguments) {
            return visitor.visitArguments(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TextRange {
    line: number;

    start: number;

    end: number;
}

export class PsiElement {
    private _parent: PsiElement = null

    private _children: PsiElement[] = []

    private _textRange: TextRange = new TextRange()

    parent(): PsiElement {
        return this._parent
    }

    children(): PsiElement[] {
        return this._children
    }

    textRange(): TextRange {
        return this._textRange
    }

    mount(): void {
    }

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

    dumps(): Record<string, any> {
        return {start: this._textRange.start, end: this._textRange.end}
    }

    toString(): string {
        return ""
    }
}

export class Program extends PsiElement {
    body: Declaration[] = [];

    dumps(): Record<string, any> {
        return {...super.dumps(), type: "Program", body: this.body.map(s => s?.dumps())};
    }

    mount() {
        this.body.forEach(decl => {
            decl?.relate(this)
            decl?.mount()
        })
    }
}

export abstract class Declaration extends PsiElement {
}

export abstract class Statement extends PsiElement {
}

export abstract class Expression extends PsiElement {
}

export class ClassDeclaration extends Declaration {
    private _id: Identifier;
    variables: VariableDeclaration[] = [];
    methods: FunctionDeclaration[] = [];

    get id(): Identifier {
        return this._id
    }

    set id(id: Identifier) {
        this._id = id
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(), type: "ClassDeclaration", id: this._id?.dumps(),
            variables: this.variables.map(v => v?.dumps()),
            methods: this.methods.map(m => m?.dumps())
        };
    }

    mount() {
        this._id?.relate(this);
        this._id?.mount()
        this.variables.forEach(variable => {
            variable?.relate(this);
            variable?.mount()
        })
        this.methods.forEach(method => {
            method?.relate(this);
            method?.mount()
        })
    }
}

export class FunctionDeclaration extends Declaration {
    private _id: Identifier;
    private _body: BlockStatement;
    params: Identifier[] = [];

    get id(): Identifier {
        return this._id
    }

    set id(id: Identifier) {
        this._id = id
    }

    get body(): BlockStatement {
        return this._body
    }

    set body(e: BlockStatement) {
        this._body = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "FunctionDeclaration",
            id: this._id?.dumps(),
            params: this.params.map(p => p?.dumps()),
            body: this._body?.dumps()
        };
    }

    mount() {
        this._id?.relate(this);
        this._id?.mount()
        this._body?.relate(this);
        this._body?.mount()
        this.params.forEach(param => {
            param?.relate(this);
            param?.mount()
        })
    }
}

export class VariableDeclaration extends Declaration {
    private _id: Identifier;
    private _init: Expression;
    private _kind: string;
    get kind(): string {
        return this._kind
    }

    set kind(k: string) {
        this._kind = k
    }

    get id(): Identifier {
        return this._id
    }

    set id(id: Identifier) {
        this._id = id
    }

    get init(): Expression {
        return this._init
    }

    set init(e: Expression) {
        this._init = e
    }

    dumps(): Record<string, any> {
        return {...super.dumps(), type: "VariableDeclaration", id: this._id?.dumps(), init: this._init?.dumps()};
    }

    mount() {
        this._id?.relate(this);
        this._id?.mount()
        this._init?.relate(this);
        this._init?.mount()
    }
}

export class BlockStatement extends Statement {
    body: Statement[] = [];

    dumps(): Record<string, any> {
        return {...super.dumps(), type: "BlockStatement", body: this.body.map(s => s?.dumps())};
    }

    mount() {
        this.body.forEach(stmt => {
            stmt?.relate(this);
            stmt?.mount()
        })
    }
}

export class IfStatement extends Statement {
    private _test: Expression;
    private _consequent: BlockStatement;
    private _alternate: IfStatement | BlockStatement;

    get test(): Expression {
        return this._test
    }

    set test(e: Expression) {
        this._test = e
    }

    get consequent(): BlockStatement {
        return this._consequent
    }

    set consequent(e: BlockStatement) {
        this._consequent = e
    }

    get alternate(): IfStatement | BlockStatement {
        return this._alternate
    }

    set alternate(e: IfStatement | BlockStatement) {
        this._alternate = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "IfStatement",
            test: this._test?.dumps(),
            consequent: this._consequent?.dumps(),
            alternate: this._alternate?.dumps()
        };
    }

    mount() {
        this._test?.relate(this);
        this._test?.mount()
        this._consequent?.relate(this);
        this._consequent?.mount()
        this._alternate?.relate(this);
        this._alternate?.mount()
    }
}

export class LoopStatement extends Statement {
}

export class ForStatement extends LoopStatement {
    private _init: Expression;
    private _test: Expression;
    private _update: Expression;
    private _body: BlockStatement;

    get init(): Expression {
        return this._init
    }

    set init(e: Expression) {
        this._init = e
    }

    get test(): Expression {
        return this._test
    }

    set test(e: Expression) {
        this._test = e
    }

    get update(): Expression {
        return this._update
    }

    set update(e: Expression) {
        this._update = e
    }

    get body(): BlockStatement {
        return this._body
    }

    set body(e: BlockStatement) {
        this._body = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "ForStatement",
            init: this._init?.dumps(),
            test: this._test?.dumps(),
            update: this._update?.dumps(),
            body: this._body?.dumps()
        };
    }

    mount() {
        this._init?.relate(this);
        this._init?.mount()
        this._test?.relate(this);
        this._test?.mount()
        this._update?.relate(this);
        this._update?.mount()
        this._body?.relate(this);
        this._body?.mount()
    }
}

export class ForeachStatement extends LoopStatement {
    private _left: Expression;
    private _right: Expression;
    private _body: BlockStatement;

    get left(): Expression {
        return this._left
    }

    set left(e: Expression) {
        this._left = e
    }

    get right(): Expression {
        return this._right
    }

    set right(e: Expression) {
        this._right = e
    }

    get body(): BlockStatement {
        return this._body
    }

    set body(e: BlockStatement) {
        this._body = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "ForeachStatement",
            left: this._left?.dumps(),
            right: this._right?.dumps(),
            body: this._body?.dumps()
        };
    }

    mount() {
        this._left?.relate(this);
        this._left?.mount()
        this._right?.relate(this);
        this._right?.mount()
        this._body?.relate(this);
        this._body?.mount()
    }
}

export class WhileStatement extends LoopStatement {
    private _test: Expression;
    private _body: BlockStatement;

    get test(): Expression {
        return this._test
    }

    set test(e: Expression) {
        this._test = e
    }

    get body(): BlockStatement {
        return this._body
    }

    set body(e: BlockStatement) {
        this._body = e
    }

    dumps(): Record<string, any> {
        return {...super.dumps(), type: "WhileStatement", test: this._test?.dumps(), body: this._body?.dumps()};
    }

    mount() {
        this._test?.relate(this);
        this._test?.mount()
        this._body?.relate(this);
        this._body?.mount()
    }
}

export class ReturnStatement extends Statement {
    private _argument: Expression;
    get argument(): Expression {
        return this._argument
    }

    set argument(e: Expression) {
        this._argument = e
    }

    dumps(): Record<string, any> {
        return {...super.dumps(), type: "ReturnStatement", argument: this._argument?.dumps()};
    }

    mount() {
        this._argument?.relate(this);
        this._argument?.mount()
    }
}

export class ContinueStatement extends Statement {
}

export class BreakStatement extends Statement {
}

export class BinaryExpression extends Expression {
    operator: string;
    private _left: Expression;
    get left(): Expression {
        return this._left
    }

    set left(e: Expression) {
        this._left = e
    }

    private _right: Expression;
    get right(): Expression {
        return this._right
    }

    set right(e: Expression) {
        this._right = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "BinaryExpression",
            operator: this.operator,
            left: this._left?.dumps(),
            right: this._right?.dumps()
        };
    }

    toString(): string {
        return `${this._left.toString()} ${this.operator} ${this._right.toString()}`
    }

    mount() {
        this._left?.relate(this);
        this._left?.mount()
        this._right?.relate(this);
        this._right?.mount()
    }
}

export class UnaryExpression extends Expression {
    prefix: boolean;
    operator: string;
    private _argument: Expression;
    get argument(): Expression {
        return this._argument
    }

    set argument(e: Expression) {
        this._argument = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "UnaryExpression",
            operator: this.operator,
            prefix: this.prefix,
            argument: this._argument?.dumps()
        };
    }

    toString(): string {
        return `${this.prefix ? `${this.operator} ` : ''}${this._argument.toString()}${!this.prefix ? ` ${this.operator}` : ''}`
    }

    mount() {
        this._argument?.relate(this);
        this._argument?.mount()
    }
}

export class NewExpression extends Expression {
    arguments: Expression[] = [];
    private _callee: Identifier;
    get callee(): Identifier {
        return this._callee
    }

    set callee(id: Identifier) {
        this._callee = id;
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "NewExpression",
            callee: this._callee?.dumps(),
            arguments: this.arguments.map(arg => arg?.dumps())
        };
    }

    toString(): string {
        return `new ${this._callee}`
    }

    mount() {
        this._callee?.relate(this);
        this._callee?.mount()
        for (let i = 0; i < this.arguments.length; i++) {
            const argument = this.arguments[i]
            argument?.relate(this);
            argument?.mount()
        }
    }
}

export class CallExpression extends Expression {
    arguments: Expression[] = [];
    private _callee: Expression;
    get callee(): Expression {
        return this._callee
    }

    set callee(e: Expression) {
        this._callee = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "CallExpression",
            callee: this._callee?.dumps(),
            arguments: this.arguments.map(arg => arg?.dumps())
        };
    }

    toString(): string {
        return `${this._callee?.toString()}(${this.arguments.map(arg => arg.toString()).join(', ')})`
    }

    mount() {
        this._callee?.relate(this);
        this._callee?.mount()
        for (let i = 0; i < this.arguments.length; i++) {
            const argument = this.arguments[i]
            argument?.relate(this);
            argument?.mount()
        }
    }
}

export class MemberExpression extends Expression {
    protected _object_: Expression;
    protected _property: Expression;

    get object_(): Expression {
        return this._object_
    }

    set object_(e: Expression) {
        this._object_ = e
    }

    get property(): Expression {
        return this._property
    }

    set property(e: Expression) {
        this._property = e;
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "MemberExpression",
            "object": this._object_?.dumps(),
            property: this._property?.dumps()
        };
    }

    toString(): string {
        return `${this._object_.toString()}.${this._property.toString()}`
    }

    mount() {
        this._object_?.relate(this);
        this._object_?.mount()
        // this._property?.relate(this); this._property?.mount()
    }
}

export class DynamicMemberExpression extends Expression {
    protected _object_: Expression;
    protected _property: Expression;

    get object_(): Expression {
        return this._object_
    }

    set object_(e: Expression) {
        this._object_ = e
    }

    get property(): Expression {
        return this._property
    }

    set property(e: Expression) {
        this._property = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "DynamicMemberExpression",
            "object": this._object_?.dumps(),
            property: this._property?.dumps()
        };
    }

    mount() {
        this._object_?.relate(this);
        this._object_?.mount()
        this._property?.relate(this);
        this._property?.mount()
    }
}

export class AssignmentExpression extends Expression {
    private _operator: string;
    private _left: Expression;
    private _right: Expression;

    get operator(): string {
        return this._operator
    }

    set operator(s: string) {
        this._operator = s
    }

    get left(): Expression {
        return this._left
    }

    set left(e: Expression) {
        this._left = e
    }

    get right(): Expression {
        return this._right
    }

    set right(e: Expression) {
        this._right = e
    }

    dumps(): Record<string, any> {
        return {
            ...super.dumps(),
            type: "AssignmentExpression",
            operator: "=",
            left: this._left?.dumps(),
            right: this._right?.dumps()
        };
    }

    toString(): string {
        return `${this._left.toString()} = ${this._right.toString()}`
    }

    mount() {
        this._left?.relate(this);
        this._left?.mount()
        this._right?.relate(this);
        this._right?.mount()
    }
}

export class Identifier extends Expression {
    name: string;

    dumps(): Record<string, any> {
        return {...super.dumps(), type: "Identifier", name: this.name};
    }

    static build(name: string): Identifier {
        const r = new Identifier()
        r.name = name
        return r
    }

    toString(): string {
        return `${this.name}`
    }
}

export class Literal extends Expression {
    value: any;

    dumps(): Record<string, any> {
        return {...super.dumps(), type: "Literal", value: this.value};
    }

    static build(v: any): Literal {
        const r = new Literal()
        r.value = v instanceof Literal ? v.value : v
        return r
    }

    toString(): string {
        return `${this.value}`
    }
}

/**
 * Scope system
 */

export class ISymbol {
    private _id: string = null
    private _value: IValue = null

    constructor(id: string, value: IValue) {
        this._id = id;
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

class Scope {
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
        this._symbols.delete(name);
        return this
    }

    toString(): string {
        return Array.from(this._symbols.keys()).map(id => `  ${id} : ${this._symbols.get(id).value.toString()}`).join('\n')
    }
}

export class ScopeProvider {
    private _scopes: Scope[]

    constructor(scopes: Scope[]) {
        this._scopes = scopes
    }

    // derive(scope): ScopeProvider { return new ScopeProvider([...this._scopes, scope]) }

    derive(): ScopeProvider {
        return new ScopeProvider([...this._scopes])
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

    keys() {
        return Array.from(this._properties.keys());
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

    size() {
        return this._item.length
    }

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

// export class FutureValue extends IValue {
//     private _value: Promise<any>;
//
//     set value(p: Promise<any>) { this._value = p }
//
//     get value() { return this._value }
//
//     async get() { return await this._value }
// }

export interface Executor {
    execute(scope: ScopeProvider, decl: FunctionDeclaration, ...args: IValue[]): Promise<IValue>;
}

export abstract class CallableValue extends ObjectValue {
    protected _scope: ScopeProvider

    protected _executor: Executor

    setScope(scope: ScopeProvider) {
        this._scope = scope
        return this
    }

    setExecutor(executor: Executor) {
        this._executor = executor
        return this
    }

    abstract invoke(...args: IValue[]): Promise<IValue>;
}

export class DeclarativeFunctionValue extends CallableValue {
    constructor(readonly decl: FunctionDeclaration) {
        super();
        this._isNull = false
    }

    async invoke(...args: IValue[]): Promise<IValue> {
        return await this._executor.execute(this._scope, this.decl, ...args);
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

    async invoke(...args: IValue[]): Promise<IValue> {
        this._scope.buildScope()
        const _r = await this._executor.execute(this._scope.derive().buildScope().add(new ISymbol('self', this.obj)), this.decl, ...args)
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

    static valueOf(iv: IValue): any {
        if (iv instanceof StringValue) return iv.value
        if (iv instanceof NumberValue) return iv.value
        if (iv instanceof BooleanValue) return iv.value
        if (iv instanceof ObjectValue && iv.isNull()) return null
        if (iv instanceof ObjectValue && !iv.isNull() && iv instanceof ArrayValue) {
            const _r: Record<string, any>[] = []
            for (let i = 0; i < iv.size(); i++) {
                _r.push(ValueSystem.valueOf(iv.getItem(i)))
            }
            return _r
        }
        if (iv instanceof ObjectValue) {
            const _r: Record<string, any> = {}
            for (const key of iv.keys()) {
                _r[key] = iv.getProperty(key)
            }
            return _r
        }
        return null
    }
}

export interface Handle<T> {
    match(): boolean;

    apply(): T;
}

export function handle<T>(options: Handle<T>[]): T {
    for (let i = 0; i < options.length; i++) {
        const option = options[i]
        if (option.match())
            return option.apply()
    }
    return null
}

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

export class PsiBuilder {
    private _program: Program = null

    program() {
        return this._program
    }

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
            l.left = this.handleExpression(tree.expression(0))
            l.right = this.handleExpression(tree.expression(1))
            l.body = this.handleBlockStatement(tree.children[tree.children.length - 1] as BlockStatementContext)
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
        if (tree.children.length === 1) {
            return this.handleTerminal(tree.children[0] as TerminalNode)
        }
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
        assignment.left = this.handleExpression(tree.children[0] as ExpressionContext)
        assignment.right = this.handleExpression(tree.children[2] as ExpressionContext)
        return assignment
    }

    handleBinaryExpression(tree: ExpressionContext) {
        const binary = new BinaryExpression().setTextRange(tree)
        binary.operator = tree.children[1].getText()
        binary.left = this.handleExpression(tree.children[0] as ExpressionContext)
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

function uuid() {
    const t = new Date().getTime().toString(16)
    return new Array(32).fill(0).map((_, i) =>
        i % 2 === 0 && i / 2 < t.length ? t[i / 2] : Math.floor(Math.random() * 16).toString(16)).reverse().join('')
}

async function walk(
    el: PsiElement,
    onBefore: (e: PsiElement) => Promise<boolean>,
    onAfter: (e: PsiElement) => Promise<void> = null
) {
    if (!el) return
    if (await onBefore(el)) return
    for (const child of el.children()) {
        await walk(child, onBefore, onAfter)
    }
    if (onAfter) await onAfter(el)
}

export abstract class Evaluator {
    abstract getScope(): ScopeProvider

    abstract callTrap(callee: CallableValue, ...args: IValue[]): Promise<IValue>

    /**
     * @notice Keep the below!!! DO NOT remove the 'debug' log!
     * @todo: The next release will be a major refactoring.
     *        The current evaluation is not compatible with underlying system.
     *        The high-level evaluation will replaced by bytecode!
     */
    private _hdReq: string[] = []
    private _hdBtc: Map<string, string[]> = new Map

    private iCurReq() {
        return this._hdReq[this._hdReq.length - 1]
    }

    private iBtcRec(cmd: string) {
        this._hdBtc.get(this.iCurReq()).push(cmd)
    }

    async evaluate(exp: Expression): Promise<IValue> {
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
        await walk(exp, async (el: Expression) => {
            // if (checkpoints.has(el)) {
            //     console.warn(`[LANG] checkpoint exception`)
            //     return true
            // }
            // checkpoints.add(el)
            if (el instanceof AssignmentExpression && el.left instanceof Identifier) {
                if (!this.getScope().contains(el.left.name))
                    this.getScope().scan(new ISymbol(el.left.name, ValueSystem.buildNull()))
            }
            return false
        }, async (el: Expression) => {
            // // console.debug(valueStack)
            if (el instanceof Literal) {
                push_stack(this.handleLiteral(el))
                return
            }
            if (el instanceof Identifier) {
                push_stack(this.handleIdentifier(el))
                return
            }
            if (el instanceof DynamicMemberExpression) {
                const [obj, arg] = pop_stack(2)
                push_stack(this.handleDynamicMemberExpression(el as DynamicMemberExpression, obj, arg))
                return
            }
            if (el instanceof MemberExpression) {
                push_stack(this.handleMemberExpression(el as MemberExpression, pop_stack()[0]))
                return
            }
            if (el instanceof NewExpression) {
                push_stack(this.handleNewExpression(el as NewExpression, pop_stack()[0]))
                return
            }
            if (el instanceof AssignmentExpression) {
                const [target, value] = pop_stack(2)
                push_stack(this.handleAssignmentExpression(el as AssignmentExpression, target, value))
                return
            }
            if (el instanceof UnaryExpression) {
                push_stack(this.handleUnaryExpression(el as UnaryExpression, pop_stack()[0]))
                return
            }
            if (el instanceof BinaryExpression) {
                const [left, right] = pop_stack(2)
                push_stack(this.handleBinaryExpression(el as BinaryExpression, left, right))
                return
            }
            if (el instanceof CallExpression) {
                const nArgs = el.arguments.length
                const [callee, ...args] = pop_stack(nArgs + 1)
                push_stack(await this.handleCallExpression(el, callee, ...args))
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
        if (!this.getScope().contains(exp.name))
            throw new Error(`error:${exp.textRange().line}: no such identifier : ${exp.name}`)
        return this.getScope().get(exp.name).value
    }

    private handleAssignmentExpression(exp: AssignmentExpression, target: IValue, value: IValue): IValue {
        this.iBtcRec(`assign`)
        if (exp.left instanceof Identifier) {
            const identifier = exp.left
            let symbol = this.getScope().get(identifier.name)
            // if (!symbol)
            //     symbol = new ISymbol(identifier.name, value)
            symbol.value = value
            this.getScope().scan(symbol)
            return value
        }
        if (!target.hasRef())
            throw new Error(`error: ${exp.left.toString()} not assignable`)
        target.getRef().setValue(value)
        return value
    }

    private async handleCallExpression(exp: CallExpression, callee: IValue, ...args: IValue[]): Promise<IValue> {
        this.iBtcRec(`call`)
        // // console.debug(callee)
        if (!(callee instanceof CallableValue))
            throw new Error(`error: ${callee.toString()} not callable`)
        // // console.debug(`[LANG] args : ${args.map(arg => arg.toString()).join(", ")} `)
        // // console.debug(`[LANG] callee :`, callee)
        // return callee.setScope(this.scope).setVM(this.vm).invoke(...args)
        return await this.callTrap(callee, ...args)
    }

    private handleDynamicMemberExpression(exp: DynamicMemberExpression, obj: IValue, property: IValue): IValue {
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

    private handleMemberExpression(exp: MemberExpression, obj: IValue): IValue {
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

    private handleNewExpression(exp: NewExpression, callee: IValue, ...args: IValue[]): ObjectValue {
        this.iBtcRec(`new`)
        const cls = exp.callee
        const symbol = this.getScope().get(cls.name)
        if (!symbol)
            throw new Error(`error: no such class ${cls}`);
        if (!(symbol.value instanceof DeclarativeClassValue))
            throw new Error(`error: ${cls.name} not class type`)
        return ValueSystem.buildDeclarativeObject(symbol.value);
    }

    private handleUnaryExpression(exp: UnaryExpression, arg: IValue): IValue {
        const op = exp.operator
        this.iBtcRec(`unary(${op})`)
        return handle<IValue>([
            {
                match: () => op === '!' && arg instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean(!(arg as NumberValue).value)
            },
            {
                match: () => op === '!' && arg instanceof BooleanValue,
                apply: () => ValueSystem.buildBoolean(!(arg as BooleanValue).value)
            },
            {
                match: () => op === '!' && arg instanceof ObjectValue,
                apply: () => ValueSystem.buildBoolean((arg as ObjectValue).isNull())
            },
            {
                match: () => op === '~' && arg instanceof NumberValue,
                apply: () => ValueSystem.buildNumber(~(arg as NumberValue).value)
            },
            {
                match: () => op === '+' && arg instanceof NumberValue,
                apply: () => arg
            },
            {
                match: () => op === '-' && arg instanceof NumberValue,
                apply: () => ValueSystem.buildNumber(-(arg as NumberValue).value)
            },
            {
                match: () => true,
                apply: () => {
                    throw new Error(`error: invalid unary operation : ${op}, argument : ${arg.toString()}`)
                }
            },
        ])
    }

    private handleBinaryExpression(exp: BinaryExpression, left: IValue, right: IValue): IValue {
        const op = exp.operator
        this.iBtcRec(`binary(${op})`)
        return handle<IValue>([
            {
                match: () => op === '+' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value + (right as NumberValue).value)
            },
            {
                match: () => op === '+' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildString((left as StringValue).value + (right as StringValue).value)
            },
            {
                match: () => op === '-' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value - (right as NumberValue).value)
            },
            {
                match: () => op === '*' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value * (right as NumberValue).value)
            },
            {
                match: () => op === '/' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value / (right as NumberValue).value)
            },
            {
                match: () => op === '%' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value % (right as NumberValue).value)
            },
            {
                match: () => op === '^' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value ^ (right as NumberValue).value)
            },
            {
                match: () => op === '|' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value | (right as NumberValue).value)
            },
            {
                match: () => op === '&' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildNumber((left as NumberValue).value & (right as NumberValue).value)
            },

            {
                match: () => op === '>' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value > (right as NumberValue).value)
            },
            {
                match: () => op === '>=' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value >= (right as NumberValue).value)
            },
            {
                match: () => op === '<' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value < (right as NumberValue).value)
            },
            {
                match: () => op === '<=' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value <= (right as NumberValue).value)
            },
            {
                match: () => op === '==' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value === (right as NumberValue).value)
            },
            {
                match: () => op === '!=' && left instanceof NumberValue && right instanceof NumberValue,
                apply: () => ValueSystem.buildBoolean((left as NumberValue).value !== (right as NumberValue).value)
            },

            {
                match: () => op === '>' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value > (right as StringValue).value)
            },
            {
                match: () => op === '>=' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value >= (right as StringValue).value)
            },
            {
                match: () => op === '<' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value < (right as StringValue).value)
            },
            {
                match: () => op === '<=' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value <= (right as StringValue).value)
            },
            {
                match: () => op === '==' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value === (right as StringValue).value)
            },
            {
                match: () => op === '!=' && left instanceof StringValue && right instanceof StringValue,
                apply: () => ValueSystem.buildBoolean((left as StringValue).value !== (right as StringValue).value)
            },

            {
                match: () => op === '==' && left instanceof BooleanValue && right instanceof BooleanValue,
                apply: () => ValueSystem.buildBoolean((left as BooleanValue).value === (right as BooleanValue).value)
            },
            {
                match: () => op === '!=' && left instanceof BooleanValue && right instanceof BooleanValue,
                apply: () => ValueSystem.buildBoolean((left as BooleanValue).value !== (right as BooleanValue).value)
            },

            {
                match: () => op === '==' && left instanceof ObjectValue && right instanceof ObjectValue,
                apply: () => ValueSystem.buildBoolean((left as ObjectValue) === (right as ObjectValue))
            },
            {
                match: () => op === '!=' && left instanceof ObjectValue && right instanceof ObjectValue,
                apply: () => ValueSystem.buildBoolean((left as ObjectValue) !== (right as ObjectValue))
            },

            {
                match: () => true,
                apply: () => {
                    throw new Error(`error: invalid binary operation : ${op}, left : ${left.toString()}, right : ${right.toString()}`)
                }
            },
        ])
    }
}

/**
 * The definition of bytecode is so heavy!
 * @todo: Replace the original bytecode class by real bytecode!
 */
abstract class Bytecode {
    abstract toString(): string;
}

class BtcGoto implements Bytecode {
    constructor(readonly tag: string) {
    }

    toString(): string {
        return `goto ${this.tag}`
    }
}

class BtcTest implements Bytecode {
    constructor(readonly expression: Expression, readonly tag: string) {
    }

    toString(): string {
        return `goto ${this.tag}, test ${this.expression.toString()}`
    }
}

class BtcEval implements Bytecode {
    constructor(readonly expression: Expression) {
    }

    toString(): string {
        return `eval ${this.expression.toString()}`
    }
}

class BtcRet implements Bytecode {
    constructor(readonly expression: Expression) {
    }

    toString(): string {
        return `ret ${this.expression.toString()}`
    }
}

class BtcMark implements Bytecode {
    constructor(readonly tag: string) {
    }
}

class Compiler {
    private _bytecodes: Bytecode[] = []
    private _localLabelCount: number = 0
    private _localLabelRecordStack: Record<string, any>[] = []

    getBytecodes(): Bytecode[] {
        return this._bytecodes
    }

    reset() {
        this._bytecodes = [];
        this._localLabelCount = 0;
        this._localLabelRecordStack = [];
        return this
    }

    compile(func: FunctionDeclaration) {
        this.handleFunctionDeclaration(func)
        return this
    }

    private handleFunctionDeclaration(func: FunctionDeclaration) {
        const [lc_0] = this.allocate()
        this._localLabelRecordStack.push({type: 'function', end: lc_0})
        this.handleBlockStatement(func.body)
        this.emitMark(lc_0)
        this._localLabelRecordStack.pop()
    }

    private handleIfStatement(stmt: IfStatement) {
        const [lc_0, lc_1] = this.allocate(2)
        this.emitTest(lc_0, stmt.test)
        this.handleBlockStatement(stmt.consequent)
        this.emitGoto(lc_1)
        this.emitMark(lc_0)
        if (stmt.alternate !== null) {
            if (stmt.alternate instanceof IfStatement) {
                this.handleIfStatement(stmt.alternate)
            } else {
                this.handleBlockStatement(stmt.alternate)
            }
        }
        this.emitMark(lc_1)
    }

    private handleBlockStatement(stmts: BlockStatement) {
        for (let i = 0; i < stmts.body.length; i++) {
            const stmt = stmts.body[i]
            if (stmt instanceof Expression) {
                this.emitEval(stmt)
            } else if (stmt instanceof BreakStatement) {
                this.handleBreakStatement(stmt)
            } else if (stmt instanceof ContinueStatement) {
                this.handleContinueStatement(stmt)
            } else if (stmt instanceof ReturnStatement) {
                this.handleReturnStatement(stmt)
            } else if (stmt instanceof IfStatement) {
                this.handleIfStatement(stmt)
            } else if (stmt instanceof WhileStatement) {
                this.handleWhileStatement(stmt)
            } else if (stmt instanceof ForStatement) {
                this.handleForStatement(stmt)
            }
        }
    }

    private handleBreakStatement(stmt: BreakStatement) {
        const item = this.getLastLoop()
        if (!item)
            throw new Error(`found none loop!`)
        this.emitGoto(item.end)
    }

    private handleContinueStatement(stmt: ContinueStatement) {
        const item = this.getLastLoop()
        if (!item)
            throw new Error(`found none loop!`)
        if (item.type === 'while') {
            this.emitGoto(item.test)
        } else if (item.type === 'for') {
            this.emitGoto(item.update)
        }
    }

    private handleWhileStatement(stmt: WhileStatement) {
        const [lc_0, lc_1] = this.allocate(2)
        this._localLabelRecordStack.push({type: 'while', test: lc_0, end: lc_1})
        this.emitMark(lc_0)
        this.emitTest(lc_1, stmt.test)
        this.handleBlockStatement(stmt.body)
        this.emitGoto(lc_0)
        this.emitMark(lc_1)
        this._localLabelRecordStack.pop()
    }

    private handleForStatement(stmt: ForStatement) {
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

    private handleReturnStatement(stmt: ReturnStatement) {
        if (stmt.argument !== null)
            this.emitRet(stmt.argument)
        this.emitGoto(this._localLabelRecordStack[0].end)
    }

    private emitTest(another: string, expr: Expression) {
        this._bytecodes.push(new BtcTest(expr, another))
    }

    private emitEval(expr: Expression) {
        this._bytecodes.push(new BtcEval(expr))
    }

    private emitGoto(lc: string) {
        this._bytecodes.push(new BtcGoto(lc))
    }

    private emitMark(lc: string) {
        this._bytecodes.push(new BtcMark(lc))
    }

    private emitRet(expr: Expression) {
        this._bytecodes.push(new BtcRet(expr))
    }

    private getLastLoop(): Record<string, any> {
        return this._localLabelRecordStack.reverse().filter(rc => ['while', 'for'].includes(rc['type']))[0]
    }

    private allocate(n: number = 1): string[] {
        return new Array(n).fill('').map(_ => `.L${this._localLabelCount++}`)
    }
}

export class StackFrame extends Evaluator {
    private _csip: number
    private _scope: ScopeProvider
    private _bytecodes: Bytecode[]
    private _keyPoints: Map<string, number> = new Map
    private _vm: VirtualMachine

    setScope(scope: ScopeProvider) {
        this._scope = scope;
        return this
    }

    setBytecodes(bts: Bytecode[]) {
        this._bytecodes = bts;
        return this
    }

    setVirtualMachine(vm: VirtualMachine) {
        this._vm = vm;
        return this
    }

    getScope(): ScopeProvider {
        return this._scope;
    }

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
            if (btc instanceof BtcRet) {
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
            if (btc instanceof BtcMark) {
                this._keyPoints.set(btc.tag, i);
                return
            }
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
            if (btc instanceof BtcGoto) {
                this._csip = this._keyPoints.get(btc.tag);
                continue
            }
            break
        }
        return btc
    }
}

export class VirtualMachine implements Executor {
    private _functions: Map<FunctionDeclaration, Bytecode[]> = new Map
    private _callstack: StackFrame[] = []
    private _compiler: Compiler = new Compiler()

    async execute(scope: ScopeProvider, decl: FunctionDeclaration, ...args: IValue[]): Promise<IValue> {
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
    private _vm: VirtualMachine
    private _builder: PsiBuilder
    private _program: Program

    constructor() {
        this._builder = new PsiBuilder()
        this._org = new Organizer()
        this._vm = new VirtualMachine()
    }

    compile(program: string) {
        this._program = this._builder.compile(program).program()
        for (const decl of this._program.body) {
            if (decl instanceof FunctionDeclaration) {
                this._org.scanFunction(decl)
                continue
            }
            if (decl instanceof ClassDeclaration) {
                this._org.scanClass(decl)
            }
        }
        return this
    }

    inject(name: string, func: BuiltinFunctionValue) {
        this._org.setGlobalSymbol(name, func);
        return this
    }

    async main() {
        let runner: FunctionDeclaration = null
        for (const decl of this._program.body) {
            if (decl instanceof FunctionDeclaration && decl.id.name === 'main') {
                runner = decl
                break
            }
        }
        if (!runner)
            throw new Error(`No entry function main!`)
        return ValueSystem.valueOf(await this._vm.execute(this._org.createFunctionScope(), runner))
    }
}

class PrintFunction extends BuiltinFunctionValue {
    async invoke(...args: IValue[]): Promise<IValue> {
        let stream = ''
        for (let i = 0; i < args.length; i++) {
            stream += `${args[i].toString()}`
        }
        console.debug("%c[MOON]", "color: #88cc88", `${stream}`)
        return null;
    }
}

const moon = new ScriptEngine()

moon.inject('println', new PrintFunction())

declare global {
    interface Window {
        moon: ScriptEngine;
    }
}

window.moon = moon