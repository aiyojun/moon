cmake_minimum_required(VERSION 3.0.0)

project(MoonCpp)

set(CMAKE_CXX_STANDARD 17)

include_directories(include include/antlr4-runtime gen)

add_executable(moonc
    src/main.cpp
    src/psi/PsiElement.cpp
    src/psi/BinaryExpression.cpp
    src/psi/UnaryExpression.cpp
    src/psi/CallExpression.cpp
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
)

target_link_libraries(moonc lib/x64/antlr4-runtime.lib)

