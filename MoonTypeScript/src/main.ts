import {MoonScriptEngine} from "./moon/engine.js";

const text = `
def main(argc, argv) {
    println("Hello World! Nice to meet you! I'm Moon~");
    return 0;
}
`
new MoonScriptEngine()
    .compile(text)
    .run()