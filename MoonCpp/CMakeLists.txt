cmake_minimum_required(VERSION 3.0.0)

project(MoonCpp)

set(CMAKE_CXX_STANDARD 17)

include_directories(include include/antlr4-runtime src src/parser src/base src/psi)

add_executable(moonc
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
    src/psi/PsiBuilder.cpp
    src/psi/ParseTreeTraverser.cpp
    src/psi/PsiElementTraverser.cpp
    src/psi/PsiUtils.cpp
    src/psi/Literal.cpp
    src/base/MoonScriptEngine.cpp
    src/base/BytecodeCompiler.cpp
    src/base/Evaluator.cpp
    src/base/Runtime.cpp
    src/base/VirtualMachine.cpp
    src/parser/MoonLexer.cpp
    src/parser/MoonParser.cpp
    src/parser/MoonListener.cpp
    src/parser/MoonVisitor.cpp
    src/base/Console.cpp
)

target_link_libraries(moonc C:/Users/jun.dai/Documents/GitHub/moon/MoonCpp/lib/x64/antlr4-runtime.lib)

