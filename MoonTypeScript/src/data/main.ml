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

def main2() {
    println("Hello World!");
    /*x = 0;
    while (x < 10) {
        x = x + 2;
        println(x);
    }*/
    for (i = 0; i < 10; i = i + 3) {
        println(i);
    }/*
    if (x == 9) {
        println("if ", x);
    } else if (x == 10) {
        println("else if ", x);
    } else {
        println("else ", x);
    }*/
    return 0;
}