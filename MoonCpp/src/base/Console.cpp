#include "Console.h"

#if defined(_WIN32) || defined(_WIN64)
#include <windows.h>
HANDLE hwndConsole;
#endif


Console *Console::_self = nullptr;

void Console::info(const std::string &message) {
#if defined(_WIN32) || defined(_WIN64)
    SetConsoleTextAttribute(hwndConsole, FOREGROUND_GREEN | FOREGROUND_INTENSITY);
    std::cout << "[MOON] ";
    SetConsoleTextAttribute(hwndConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
#else
    std::cout << "\033[32;1m[MOON]\033[0m ";
#endif
    std::cout << message << std::endl;
}

Console::Console() {
#if defined(_WIN32) || defined(_WIN64)
    hwndConsole = GetStdHandle(STD_OUTPUT_HANDLE);
#endif
}

Console *Console::Get() {
    if (_self == nullptr) {
        _self = new Console;
    }
    return _self;
}

void Console::warn(const std::string &message) {
#if defined(_WIN32) || defined(_WIN64)
    SetConsoleTextAttribute(hwndConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_INTENSITY);
    std::cout << "[MOON] ";
    SetConsoleTextAttribute(hwndConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
#else
    std::cout << "\033[33;1m[MOON]\033[0m ";
#endif
    std::cout << message << std::endl;
}

void Console::error(const std::string &message) {
#if defined(_WIN32) || defined(_WIN64)
    SetConsoleTextAttribute(hwndConsole, FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cout << "[MOON] ";
    SetConsoleTextAttribute(hwndConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
#else
    std::cout << "\033[31;1m[MOON]\033[0m ";
#endif
    std::cout << message << std::endl;
}
