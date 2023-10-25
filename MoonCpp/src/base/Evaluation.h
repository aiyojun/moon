#ifndef MOONCPP_EVALUATION_H
#define MOONCPP_EVALUATION_H

#include "PsiElementTraverser.h"
#include "SymbolProvider.h"
#include "VirtualMachine.h"
#include "types.h"
#include <string>
#include <set>
#include <vector>

class Evaluation : public PsiElementTraverser {
public:
    Evaluation(SymbolProvider *scope, VirtualMachine *vm);

    std::shared_ptr<IValue> evaluate(Expression *exp);

    bool onBefore(PsiElement *e) override;

    void onAfter(PsiElement *e) override;

private:
    std::shared_ptr<IValue> handleLiteral(Literal *exp);

    std::shared_ptr<IValue> handleIdentifier(Identifier *exp);

    std::shared_ptr<IValue> handleAssign(AssignmentExpression *exp, const std::shared_ptr<IValue> &target, const std::shared_ptr<IValue> &value);

    std::shared_ptr<IValue> handleCall(CallExpression *exp, const std::shared_ptr<IValue> &callee, std::vector<std::shared_ptr<IValue> > args);

    std::shared_ptr<IValue> handleDynamicMember(DynamicMemberExpression *exp, const std::shared_ptr<IValue> &obj, const std::shared_ptr<IValue> &property);

    std::shared_ptr<IValue> handleMember(MemberExpression *exp, const std::shared_ptr<IValue> &obj);

    std::shared_ptr<IValue> handleNew(NewExpression *exp, std::vector<std::shared_ptr<IValue> > args);

    std::shared_ptr<IValue> handleUnary(UnaryExpression *exp, const std::shared_ptr<IValue> &arg);

    std::shared_ptr<IValue> handleBinary(BinaryExpression *exp, const std::shared_ptr<IValue> &left, const std::shared_ptr<IValue> &right);

private:
    SymbolProvider *_scope;

    VirtualMachine *_vm;

    std::vector<std::shared_ptr<IValue>> _vstack;

    std::set<PsiElement *> _checkpoints;
};

#endif //MOONCPP_EVALUATION_H
