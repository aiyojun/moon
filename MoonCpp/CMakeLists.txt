cmake_minimum_required(VERSION 3.0.0)

project(MoonCpp)

set(CMAKE_CXX_STANDARD 17)

include_directories(
    include
    include/antlr4-runtime
    src
    src/parser
    src/base
    src/psi
    src/moon
    src/scope
    src/vars
    src/debug
    src/error
)

add_executable(moon
    src/main.cpp
    src/psi/PsiElement.cpp
    src/psi/Identifier.cpp
    src/psi/BinaryExpression.cpp
    src/psi/UnaryExpression.cpp
    src/psi/CallExpression.cpp
    src/psi/NewExpression.cpp
    src/psi/AssignmentExpression.cpp
    src/psi/MemberExpression.cpp
    src/psi/ClassDeclaration.cpp
    src/psi/FunctionDeclaration.cpp
    src/psi/VariableDeclaration.cpp
    src/psi/IfStatement.cpp
    src/psi/ForStatement.cpp
    src/psi/WhileStatement.cpp
    src/psi/ReturnStatement.cpp
    src/psi/TryStatement.cpp
    src/psi/CatchStatement.cpp
    src/psi/ThrowStatement.cpp
    src/psi/PsiElementTraverser.cpp
    src/psi/Literal.cpp
    src/base/PsiBuilder.cpp
    src/base/PsiUtils.cpp
    src/base/MoonScriptEngine.cpp
    src/base/BytecodeCompiler.cpp
    src/base/VirtualMachine.cpp
    src/moon/Console.cpp
    src/scope/Symbol.cpp
    src/scope/Scope.cpp
    src/scope/SymbolProvider.cpp
    src/parser/MoonLexer.cpp
    src/parser/MoonParser.cpp
    src/parser/MoonListener.cpp
    src/parser/MoonVisitor.cpp
    src/gc/Variable.cpp
    src/vars/IValue.cpp
    src/vars/Ref.cpp
    src/vars/BaseValue.cpp
    src/vars/NumberValue.cpp
    src/vars/BooleanValue.cpp
    src/vars/ObjectValue.cpp
    src/vars/ArrayValue.cpp
    src/vars/StringValue.cpp
    src/vars/CallableValue.cpp
    src/vars/DeclarativeFunctionValue.cpp
    src/vars/BuiltinFunctionValue.cpp
    src/vars/MethodValue.cpp
    src/vars/DeclarativeClassValue.cpp
    src/vars/DeclarativeObjectValue.cpp
    src/vars/ValueSystem.cpp
    src/base/Evaluation.cpp
    src/scope/Organizer.cpp
    src/debug/Debugger.cpp
        src/psi/BlockStatement.cpp
        src/psi/Program.cpp
        src/psi/BreakStatement.cpp
        src/psi/ContinueStatement.cpp
        src/psi/DynamicMemberExpression.cpp
)

target_link_libraries(moon C:/Users/jun.dai/Documents/GitHub/moon/MoonCpp/lib/x64/antlr4-runtime.lib)

