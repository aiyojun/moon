def main() {
    println("Hello World!");
    x = 0;
    if (x == 0) {
        println("if ", x);
    } else if (x == 10) {
        println("else if ", x);
    } else {
        println("else ", x);
    }
    while (x < 20) {
        x = x + 5;
        println("while ", x);
    }
}