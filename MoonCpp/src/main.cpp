#include "MoonScriptEngine.h"
#include "types.h"

int main(int argc, char* argv[]) {
    std::cout << "[LANG] Compile " << argv[1] << std::endl;
    auto engine = new MoonScriptEngine;
    std::cout << "[LANG] Test instanceof<Program *>(program) : "
        << (instanceof<PsiElement *>(engine->program()) ? "true" : "false") << std::endl;
    engine->compile(argv[1]);
    engine->run();
    return 0;
}