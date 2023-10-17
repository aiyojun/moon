#include "MoonScriptEngine.h"
#include "types.h"
#include "SyntaxError.h"

int main(int argc, char* argv[]) {
    std::cout << "[LANG] Compile " << argv[1] << std::endl;
    auto engine = new MoonScriptEngine;
//    std::cout << "[LANG] Test instanceof<Program *>(program) : "
//        << (instanceof<PsiElement *>(engine->program()) ? "true" : "false") << std::endl;
    try {
        engine->compile(argv[1]);
        engine->run();
    } catch (SyntaxError& e) {
        std::cerr << "[LANG] error " << e.what() << std::endl;
    } catch (std::exception& e) {
        std::cerr << "[LANG] error " << e.what() << std::endl;
    }
    return 0;
}