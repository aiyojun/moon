import {MoonScriptEngine} from "./moon/engine.js";

const text = `
class Hello {
    x = null;
    
    y = null;
    
    def print() {
        println("Halo ", self);
        println(self.add(1, 3));
    }
    
    def add(a, b) {
        return a + b;
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
    y.x = 12;
    // println(y.add(1, 3));
    y.print();
    // y.x = "hehe";
    // y.y = 12;
    // println(printHello(y));
}
`
new MoonScriptEngine()
    .compile(text)
    .run()

window['ml'] = function (text) { return new MoonScriptEngine().compile(text).run();  }