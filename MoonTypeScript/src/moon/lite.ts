// lite
// lvm: lang virtual machine
import * as psi from "./psi.js";

export namespace Moon {

    // export enum LiteCode {
    //     //
    //     NOP, JUMP, TEST, RET,
    //     //
    //     PUSH, POP,
    //     //
    //     MOVE, CALL, GET, READ, NEW,
    //     //
    //     NOT, INV, POS, NEG,
    //     //
    //     ADD, SUB, MUL, DIV, MOD,
    //     //
    //     AND, OR, BAND, BOR, XOR, SHL, SHR,
    //     //
    //     LT, LE, GT, GE, EQ, NE,
    // }

    // exp

    export class Compiler {
        compile(decl: psi.FunctionDeclaration): string[] {
            this.reset()
            this.handleFunctionDeclaration(decl)
            return this._bytecodes;
        }

        reset() { this._bytecodes = []; this._localLabelCount = 0; this._localLabelRecordStack = [] }

        // private static _stack: IValue[] = [];
        // private _scope: ScopeProvider = null;
        // private _bp: number = 0;
        // private _sp: number = 0;
        private _bytecodes: string[] = []
        private _localLabelCount: number = 0
        private _localLabelRecordStack: Record<string, any>[] = []
        private add(btc: string) { this._bytecodes.push(btc) }
        private allocate(n: number = 1): string[] { return new Array(n).fill('').map(_ => `.L${this._localLabelCount++}`) }
        private record(event: Record<string, any>) { this._localLabelRecordStack.push(event) }
        private erase() { this._localLabelRecordStack.pop() }
        private getLastLoop(): Record<string, any> { return this._localLabelRecordStack.reverse().filter(rc => ['while', 'for'].includes(rc['type']))[0] }

        private emitTest(lab: string, el: psi.Expression) {
            this.handleExpression(el)
            this.add(`pop 1; test/jump ${lab}`)
        }
        private emitJump(lab: string) {
            this.add(`jump ${lab}`)
        }
        private emitMark(lab: string) {
            this.add(`${lab}:`)
        }
        private emitRet(el: psi.Expression) {
            this.add(el ? `pop 1; ret` : `ret`)
        }
        protected handleFunctionDeclaration(decl: psi.FunctionDeclaration) {
            const [lc_0] = this.allocate()
            this.record({type: 'function', end: lc_0})
            this.handleBlockStatement(decl.body)
            this.emitMark(lc_0)
        }
        protected handleIfStatement(el: psi.IfStatement) {
            const [lc_0, lc_1] = this.allocate(2)
            this.emitTest(lc_0, el.test)
            this.handleBlockStatement(el.consequent)
            this.emitJump(lc_1)
            this.emitMark(lc_0)
            if (el.alternate !== null) {
                if (el.alternate instanceof psi.IfStatement) {
                    this.handleIfStatement(el.alternate)
                } else {
                    this.handleBlockStatement(el.alternate)
                }
            }
            this.emitMark(lc_1)
        }
        protected handleWhileStatement(el: psi.WhileStatement) {
            const [lc_0, lc_1] = this.allocate(2)
            this.record({type: 'while', test: lc_0, end: lc_1})
            this.emitMark(lc_0)
            this.emitTest(lc_1, el.test)
            this.handleBlockStatement(el.body)
            this.emitJump(lc_0)
            this.emitMark(lc_1)
            this.erase()
        }
        protected handleForStatement(el: psi.ForStatement) {
            const [lc_0, lc_1, lc_2] = this.allocate(3)
            this.record({type: 'for', update: lc_2, end: lc_1})
            this.handleExpression(el.init)
            this.emitMark(lc_0)
            this.emitTest(lc_1, el.test)
            this.handleBlockStatement(el.body)
            this.emitMark(lc_2)
            this.handleExpression(el.update)
            this.emitJump(lc_0)
            this.emitMark(lc_1)
            this.erase()
        }
        protected handleBlockStatement(el: psi.BlockStatement) {
            for (let i = 0; i < el.body.length; i++) {
                const stmt = el.body[i]
                if (stmt instanceof psi.Expression) {
                    this.handleExpression(stmt)
                } else if (stmt instanceof psi.BreakStatement) {
                    this.handleBreakStatement(stmt)
                } else if (stmt instanceof psi.ContinueStatement) {
                    this.handleContinueStatement(stmt)
                } else if (stmt instanceof psi.ReturnStatement) {
                    this.handleReturnStatement(stmt)
                } else if (stmt instanceof psi.IfStatement) {
                    this.handleIfStatement(stmt)
                } else if (stmt instanceof psi.WhileStatement) {
                    this.handleWhileStatement(stmt)
                } else if (stmt instanceof psi.ForStatement) {
                    this.handleForStatement(stmt)
                }
            }
        }
        protected handleBreakStatement(el: psi.BreakStatement) {
            const item = this.getLastLoop()
            if (!item) throw new Error(`found none loop!`)
            this.emitJump(item.end)
        }
        protected handleContinueStatement(el: psi.ContinueStatement) {
            const item = this.getLastLoop()
            if (!item) throw new Error(`found none loop!`)
            if (item.type === 'while') {
                this.emitJump(item.test)
            } else if (item.type === 'for') {
                this.emitJump(item.update)
            }
        }
        protected handleReturnStatement(el: psi.ReturnStatement) {
            if (el.argument !== null)
                this.emitRet(el.argument)
            this.emitJump(this._localLabelRecordStack[0].end)
        }

        protected handleExpression(el: psi.Expression) {
            psi.PsiElement.walk(el, (exp: psi.Expression) => {
                return false
            }, (exp: psi.Expression) => {
                if (exp instanceof psi.Literal) {
                    this.handleLiteral(exp)
                    return
                }
                if (exp instanceof psi.Identifier) {
                    this.handleIdentifier(exp)
                    return
                }
                if (exp instanceof psi.DynamicMemberExpression) {
                    this.handleDynamicMemberExpression(exp as psi.DynamicMemberExpression)
                    return
                }
                if (exp instanceof psi.MemberExpression) {
                    this.handleMemberExpression(exp as psi.MemberExpression)
                    return
                }
                if (exp instanceof psi.NewExpression) {
                    this.handleNewExpression(exp as psi.NewExpression)
                    return
                }
                if (exp instanceof psi.AssignmentExpression) {
                    this.handleAssignmentExpression(exp as psi.AssignmentExpression)
                    return
                }
                if (exp instanceof psi.UnaryExpression) {
                    this.handleUnaryExpression(exp as psi.UnaryExpression)
                    return
                }
                if (exp instanceof psi.BinaryExpression) {
                    this.handleBinaryExpression(exp as psi.BinaryExpression)
                    return
                }
                if (exp instanceof psi.CallExpression) {
                    this.handleCallExpression(exp)
                    return
                }
            })
        }
        protected handleLiteral(el: psi.Literal) {
            if (typeof el.value === 'string')
                this.add(`push literal.'${el.toString()}'`)
            else
                this.add(`push literal.${el.toString()}`)
        }
        protected handleIdentifier(el: psi.Identifier) {
            this.add(`load $${el.name}; push`)
        }
        protected handleAssignmentExpression(el: psi.AssignmentExpression) {
            this.add(`pop 2; assign`)
        }
        protected handleCallExpression(el: psi.CallExpression) {
            this.add(`pop ${1 + el.arguments.length}; call; push`)
        }
        protected handleDynamicMemberExpression(el: psi.DynamicMemberExpression) {
            this.add(`pop 1; access ?.${el.property.toString()}; push`)
        }
        protected handleMemberExpression(el: psi.MemberExpression) {
            this.add(`pop 1; access ?.${el.property.toString()}; push`)
        }
        protected handleNewExpression(el: psi.NewExpression) {
            this.add(`pop ${1 + el.arguments.length}; new; push`)
        }
        protected handleUnaryExpression(el: psi.UnaryExpression) {
            this.add(`pop 1; unary.${el.operator}; push`)
        }
        protected handleBinaryExpression(el: psi.BinaryExpression) {
            this.add(`pop 2; binary.${el.operator}; push`)
        }

    }

    export class Scope {

    }

    export class VirtualMachine {

    }

    export class Function {

    }

}






















































