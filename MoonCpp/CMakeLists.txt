cmake_minimum_required(VERSION 3.0.0)

project(MoonCpp)

set(CMAKE_CXX_STANDARD 17)

include_directories(include include/antlr4-runtime gen)

add_executable(moonc
    src/main.cpp
    src/psi/PsiElement.cpp
)

target_link_libraries(moonc lib/x64/antlr4-runtime.lib)

