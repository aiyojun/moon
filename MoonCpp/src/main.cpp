#include "MoonScriptEngine.h"
#include "SyntaxError.h"
#include "gc/Variable.h"

void runMoon(const std::string& path);
void runTestVariable();

int main(int argc, char* argv[]) {
    runTestVariable();
//    runMoon(argv[1]);
    return 0;
}

class Array : public Object {
public:
    Array() : Object() {}
};

void runTestVariable() {
    auto x = new Array;
    auto p0 = new Variable(x);
    {
        auto p1 = new Variable(p0);

        {
            Variable p3(p0);

            {
                Variable p4 = p3;
                Variable p5 = p1;
                Variable p6 = x;

                p4 = (*p0);
            }
        }

        delete p1;
    }
    delete p0;
}

void runMoon(const std::string& path) {
    std::cout << "[LANG] Compile " << path << std::endl;
    auto engine = new MoonScriptEngine;
    try {
        engine->compile(path);
        engine->run();
    } catch (SyntaxError& e) {
        std::cerr << "[LANG] error " << e.what() << std::endl;
    } catch (std::exception& e) {
        std::cerr << "[LANG] error " << e.what() << std::endl;
    }
}