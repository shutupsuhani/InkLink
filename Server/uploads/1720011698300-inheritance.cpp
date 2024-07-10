INHERITANCE
SINGLE LEVEL INHERITANCE
// CODE
#include <iostream>
using namespace std;

// Base class
class Vehicle {
public:
    void start() {
        cout << "Vehicle started." << endl;
    }

    void stop() {
        cout << "Vehicle stopped." << endl;
    }
};

// Derived class
class Car : public Vehicle {
public:
    void accelerate() {
        cout << "Car accelerating." << endl;
    }

    void brake() {
        cout << "Car braking." << endl;
    }
};

// Main function
int main() {
    Car myCar;
    myCar.start();
    myCar.accelerate();
    myCar.brake();
    myCar.stop();

    return 0;
}

Private Members cannot be accessed in Child class
#include <iostream>
using namespace std;
class Parent			//parent class
{
public:
void parent_property()
				//parent class method 
  {
      cout << "\ncash+gold+land+vehicles";
  } 
int p = 10;
private:
void donation_tocharity()
				//not given to child 
  {
      cout << "\n100 crores";
  } 
};

class Child:public Parent	//parent data is having public access inChild
{
public:
void child_property()//Child specific data
  {
      cout << "\n3bhhk Flat";
  } 
// contains 2 methods property() and 1 variable P;
};

int main() {
    Child c;
    c.child_property();
    c.parent_property();	//child object accessing parent method
    Parent p;
}
//p.child_property();  //error:child has no such method
//p.donation_tocharity();//parents own method, error: b
Output:

3bhhk Flat
cash+gold+land+vehicles



Syntax to Implement Multilevel Inheritance:
class A

{
//contains Only A class  properties
...;
};
class B: public A//child of A//intermediate base class
{
....;
//contains both  A, B  class properties
};
class C: public B//child of B
{
//contains both A,B ,C class properties

-----;
};
The class that is acquiring the behaviors is called child class or derived class or subclass.
The class from which behaviors are taken is called parent class or superclass or base class.
Here B class contains both the properties of A and B whereas C class contains the properties of B and also inherited properties of B i.e A class and also properties of C class

#include <iostream>
using namespace std;

// Base class
class Shape {
   public:
      void setWidth(int w) {
         width = w;
      }
   
      void setHeight(int h) {
         height = h;
      }
   
   protected:
      int width;
      int height;
};

// Intermediate derived class
class Rectangle: public Shape {
   public:
      int getArea() {
         return (width * height);
      }
};

// Derived class
class Square: public Rectangle {
   public:
      int getPerimeter() {
         return (2 * (width + height));
      }
};

int main() {
   Square sqr;
   
   sqr.setWidth(5);
   sqr.setHeight(5);
   
   // Print the area and perimeter of the object.
   cout << "Area: " << sqr.getArea() << endl;
   cout << "Perimeter: " << sqr.getPerimeter() << endl;

   return 0;
}
Multiple Inheritance in C++
In Multiple Inheritance, A derived Class can have more than 1 Base Classes, thus it is deriving properties from various base Classes.



Multiple Inheritance
Syntax to Implement Multiple Inheritance
class parent1
{
......;
};
class parent2
{
......;
};
class child:accces1 parent1,access2 parent2//multiple parents
{
-----;//data of both parent1 +parent2+child
};
#include <iostream>
using namespace std;

// Base class 1
class Shape {
   public:
      void setWidth(int w) {
         width = w;
      }
   
      void setHeight(int h) {
         height = h;
      }
   
   protected:
      int width;
      int height;
};

// Base class 2
class Color {
   public:
      void setColor(string c) {
         color = c;
      }
   
   protected:
      string color;
};

// Derived class
class Rectangle: public Shape, public Color {
   public:
      void display() {
         cout << "Width: " << width << endl;
         cout << "Height: " << height << endl;
         cout << "Color: " << color << endl;
      }
};

int main() {
   Rectangle rect;
   
   rect.setWidth(5);
   rect.setHeight(7);
   rect.setColor("Red");
   
   // Print the properties of the object.
   rect.display();

   return 0;
}
OUTPUT
Width: 5
Height: 7
Color: Red

What is Hierarchical Inheritance in C++

#include <iostream>
using namespace std;
class parent
{
  public:
  void property()
  {
      cout<<"\nProperty earned by parent";
  }
  int money=2000;
  };

class child1:public parent//child 1 extended from parent
{
  public:
  void c1_property()
  {
    cout<<"\nproperty earned by child1";
  }
};

class child2:public parent//child 2 extended from parent
{
   //child class can be empty
  //Stiill it conatins one method and variable from parent
};

main()
{
  child1 c1;
  c1.c1_property();//childs own method
  c1.property();//taken from parent
  cout<<"\nmoney got from parent:"<<c1.money;//inherited variable
  child2 c2;
  c2.property();//taken from same parent like child 1
}

Hybrid or Multipath Inheritance in C++
Example: Program to demonstrate hybrid inheritance
Run
#include <iostream>
using namespace std;
class A
{

public:
void m1()
{
cout<<"\n m1 from class A";
}

};

class B: public A//B class inherits A as Parent
{

public:
void m2()
{
cout<<"\n m2 from class B";
}
//contains data of A+B

};

class C: public A//C class inherits A as Parent
{

public:
void m3()
{
cout<<"\n m3 from class C"; } //Contains data of A+C }; class D:public B//multilevel inheritance from A->B->D 
{

public:
void m4()
{
  cout<<"\n m4 from class D"; } //contains data of class A+B+D }; class E:public C//multilevel inheritance from A->C->E
{

public:
void m5()
{
  cout<<"\n m5 from class E";
}
  //contains data of class A+C+E

};

main()
{
  D d;//contains A+B+D properties 
  d.m1();
  d.m2();
  d.m4();
  E e;//contains A+C+E properties 
  e.m1();
  e.m3();
  e.m5();

}
Output:
m1 from class A
m2 from class B
m4 from class D
m1 from class A
m3 from class C
m5 from class E
Hierarchal Inheritance