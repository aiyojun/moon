class Person {
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
    println("Class Person.x : ", h.x);
    println("Class Person.y : ", h.y);
    return 1 + 2;
}

def main() {
    println("Hello World!", " Nice to meet you! I'm Moon~");
    y = new Person();
    y.x = 12;
    println(y.add(1, 3));
    y.x = "hehe";
    y.print();
    y.y = 12;
    println(printHello(y));
}