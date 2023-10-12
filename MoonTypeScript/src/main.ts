import {ASTBuilder} from "./moon/ast.js";
import {Interpreter} from "./moon/interpreter.js";

const input = `
def main(argc, argv) {
    println("Hello World! Nice to meet you! I'm Moon~");
    return 0;
}
`
const builder = new ASTBuilder()
const interpreter = new Interpreter()
builder.compile(input)
interpreter.load(builder.psi())
interpreter.run()