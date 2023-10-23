#ifndef MOONCPP_EVALUATION_H
#define MOONCPP_EVALUATION_H

#include "PsiElementTraverser.h"
#include "SymbolProvider.h"
#include "VirtualMachine.h"
#include <string>
#include <set>
#include <vector>

class Evaluation : public PsiElementTraverser {
public:
    Evaluation(SymbolProvider *scope, VirtualMachine *vm);

    IValue *evaluate(Expression *exp);

    bool onBefore(PsiElement *e) override;

    void onAfter(PsiElement *e) override;

private:
    IValue *handleLiteral(Literal *exp);

    IValue *handleIdentifier(Identifier *exp);

    IValue *handleAssign(AssignmentExpression *exp, IValue *target, IValue *value);

    IValue *handleCall(CallExpression *exp, IValue *callee, std::vector<IValue *> args);

    IValue *handleDynamicMember(DynamicMemberExpression *exp, IValue *obj, IValue *property);

    IValue *handleMember(MemberExpression *exp, IValue *obj);

    IValue *handleNew(NewExpression *exp, std::vector<IValue *> args);

    IValue *handleUnary(UnaryExpression *exp, IValue *arg);

    IValue *handleBinary(BinaryExpression *exp, IValue *left, IValue *right);

private:
    SymbolProvider *_scope;

    VirtualMachine *_vm;

    std::vector<IValue *> _vstack;

    std::set<PsiElement *> _checkpoints;
};

#endif //MOONCPP_EVALUATION_H
