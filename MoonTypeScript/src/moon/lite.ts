// lvm: lang virtual machine
// lite
import * as psi from "./psi.js";
import {Expression, IfStatement, PsiElement} from "./psi.js";

namespace Moon {

    export enum LiteCode {
        //
        NOP, JUMP, TEST, RET,
        //
        PUSH, POP,
        //
        MOVE, CALL, GET, READ, NEW,
        //
        NOT, INV, POS, NEG,
        //
        ADD, SUB, MUL, DIV, MOD,
        //
        AND, OR, BAND, BOR, XOR, SHL, SHR,
        //
        LT, LE, GT, GE, EQ, NE,
    }

    // exp

    export class Compiler {
        compile(decl: psi.FunctionDeclaration): string[] {
            this.reset()
            return this._bytecodes;
        }

        reset() { this._bytecodes = []; this._localLabelCount = 0; this._localLabelRecordStack = [] }

        private _bytecodes: string[] = []
        private _localLabelCount: number = 0
        private _localLabelRecordStack: Record<string, any>[] = []
        private add(btc: string) { this._bytecodes.push(btc) }
        private allocate(n: number = 1): string[] { return new Array(n).map(_ => `.L${this._localLabelCount++}`) }
        private record(event: Record<string, any>) { this._localLabelRecordStack.push(event) }
        private erase() { this._localLabelRecordStack.pop() }
        private getLastLoop(): Record<string, any> { return this._localLabelRecordStack.reverse().filter(rc => ['while', 'for'].includes(rc['type']))[0] }

        private emitTest(lab: string, el: Expression) {}
        private emitJump(lab: string) {}
        private emitMark(lab: string) {}
        private emitRet(el: Expression) {}

        protected handleIfStatement(el: psi.IfStatement) {
            const [lc_0, lc_1] = this.allocate(2)
            this.emitTest(lc_0, el.test)
            this.handleBlockStatement(el.consequent)
            this.emitJump(lc_1)
            this.emitMark(lc_0)
            if (el.alternate !== null) {
                if (el.alternate instanceof IfStatement) {
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
        protected handleForStatement(el: psi.ForStatement) {}
        protected handleBlockStatement(el: psi.BlockStatement) {}
        protected handleBreakStatement(el: psi.BreakStatement) {}
        protected handleContinueStatement(el: psi.ContinueStatement) {}
        protected handleReturnStatement(el: psi.ReturnStatement) {}

        private _bp: number = 0;
        private _sp: number = 0;

        protected handleExpression(el: psi.Expression) {
            PsiElement.walk(el, (exp: Expression) => {

                return false
            }, (exp: Expression) => {

            })
        }
        protected handleLiteral(el: psi.Literal) {}
        protected handleIdentifier(el: psi.Identifier) {}
        protected handleAssignmentExpression(el: psi.AssignmentExpression) {}
        protected handleCallExpression(el: psi.CallExpression) {}
        protected handleDynamicMemberExpression(el: psi.DynamicMemberExpression) {}
        protected handleMemberExpression(el: psi.MemberExpression) {}
        protected handleNewExpression(el: psi.NewExpression) {}
        protected handleUnaryExpression(el: psi.UnaryExpression) {}
        protected handleBinaryExpression(el: psi.BinaryExpression) {}

    }

    export class Scope {

    }

    export class VirtualMachine {

    }

    export class Function {

    }

}






















































