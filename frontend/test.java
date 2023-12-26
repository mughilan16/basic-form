// Single
class A {
  int a = 10, b = 15;
}

class B {
  int c = a + b;
  void display() {
    System.out.println(c);
  }
}

class test {
  public static void main(String[] args) {
    B b = new B();
    b.display();
  }
}

// Hierarchical
class A {
  int a = 10;
}

class B extends A { 
  int b = 15;
  void display() {
    System.out.println(a + b);
  }
}

class C extends A {
  int c = 20;
  void display() {
    System.out.println(a + c);
  }
}

class test {
  public static void main(String[] args) {
    B b = new B();
    C b = new C();
    b.display();
    c.display();
  }
}

/// MultiLevel

class A {
  int a = 10;
}

class B extends A { 
  int b = 15;
}

class C extends B {
  int c = a + b;
  void display() {
    System.out.println(c);
  }
}

class test {
  public static void main(String[] args) {
    C b = new C();
    c.display();
  }
}
