import {MoonScriptEngine} from "./moon/engine.js";

const text = `
class Hello {
    x = null;
    
    y = null;
    
    def print() {
        println("Halo");
    }
}

def printHello(h) {
    println("Class Hello.x : ", h.x);
    println("Class Hello.y : ", h.y);
    return 1 + 2;
}

def main() {
    println("Hello World!", " Nice to meet you! I'm Moon~");
    
    y = new Hello();
    
    y.x = "hehe";
    
    y.y = 12;
    
    println(printHello(y));
}
`
new MoonScriptEngine()
    .compile(text)
    .run()

const moon = new MoonScriptEngine()

window["moon"] = moon