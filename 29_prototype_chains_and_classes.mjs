// https://exploringjs.com/impatient-js/ch_proto-chains-classes.html
import assert from "assert-strict";

// Prototypes are JavaScript’s only inheritance mechanism: each object has a prototype that is
// either null or an object.
const proto = {
  protoProp: "a",
};
const first = {
  __proto__: proto,
  firstProp: "b",
};
const second = {
  __proto__: first,
  secondProp: "c",
};

// The object inherits all of the prototype’s properties.
// So we get a chain of objects – the so-called prototype chain.
assert.equal(first.protoProp, "a");
assert.equal("protoProp" in first, true);
assert.equal(second.protoProp, "a");
assert.equal("protoProp" in second, true);
assert.equal(second.firstProp, "b");
assert.equal("firstProp" in second, true);

// ### all properties vs. own properties
// Some operations consider all properties (own and inherited)
console.log("own property:", typeof second.secondProp); // own
console.log("inherited property:", typeof second.firstProp); // inherited
console.log("inherited property (function):", typeof second.toString); // inherited

// Other operations only consider own properties – for example, Object.keys():
console.log("own (Object.keys):", Object.keys(second));

// Setting any property via an object – even an inherited one – only changes
// that very object – never one of the prototypes.
assert.deepEqual(Object.keys(first), ["firstProp"]); // has only one own property
first.protoProp = "x"; // set the inherited property
assert.deepEqual(Object.keys(first), ["firstProp", "protoProp"]); // A new own property appears
assert.equal(proto.protoProp, "a"); // The inherited property itself is unchanged
assert.equal(first.protoProp, "x"); // The own property overrides the inherited property

// ### Tips for working with
// AVOID THE PSEUDO-PROPERTY __PROTO__, NOT ALL OBJECTS HAVE IT
// --> Get a prototype: Object.getPrototypeOf(obj: Object) : Object
// --> Set a prototype: Object.create(proto: Object) : Object

const proto1 = {};
const proto2 = {};
const obj = Object.create(proto1);
assert.equal(Object.getPrototypeOf(obj), proto1);

Object.setPrototypeOf(obj, proto2);
assert.equal(Object.getPrototypeOf(obj), proto2);

// To check is X in the prototype chain of Y
assert.equal(proto.isPrototypeOf(first), true); // First in chain
assert.equal(proto.isPrototypeOf(second), true); // Second in chain
assert.equal(proto.isPrototypeOf(proto), false);
assert.equal(second.isPrototypeOf(proto), false);

// ### Sharing data via prototypes
// Consider the following code:

const janeNoProto = {
  name: "Jane",
  describe() {
    return "Person named " + this.name;
  },
};
const tarzanNoProto = {
  name: "Tarzan",
  describe() {
    return "Person named " + this.name;
  },
};

// To avoid duplicating
const PersonProto = {
  describe() {
    return "Person named " + this.name;
  },
};
const janeWithProto = {
  __proto__: PersonProto,
  name: "Jane",
};
const tarzanWithProto = {
  __proto__: PersonProto,
  name: "Tarzan",
};

assert.equal(janeWithProto.describe(), "Person named Jane");
assert.equal(tarzanWithProto.describe(), "Person named Tarzan");

// ### Classes
// Classes are basically a compact syntax for setting up prototype chains

// CLASS DECLARATION to implement a factory for person objects:
class Person {
  constructor(name) {
    // Constructor method, called directly after
    this.name = name; // a new instance has been created and initializes that instance
  }
  describe() {
    // Normal method
    return "Person named " + this.name;
  }
}

// jane and tarzan can now be created via new Person():
const jane = new Person("Jane"); // Pass the parameters to the constructor
assert.equal(jane.name, "Jane");
assert.equal(jane.describe(), "Person named Jane");

const tarzan = new Person("Tarzan");
assert.equal(tarzan.name, "Tarzan");
assert.equal(tarzan.describe(), "Person named Tarzan");

const boy = new Person();
assert.equal(boy.name, undefined);
assert.equal(boy.describe(), "Person named undefined");

// CLASS EXPRESSIONS are other way of class definition, can be anonymous and named:

// Anonymous class expression
const PersonAnon = class {};

// Named class expression
const PersonNamed = class MyClass {};

// ### Classes under the hood
// The main purpose of class Person is to set up the prototype chain
// from jane to Person.prototype and then Person (see
// https://exploringjs.com/impatient-js/ch_proto-chains-classes.html#classes-under-the-hood)
// Both (.constructor and .describe()) created properties for Person.prototype, not for Person.
// The reason is backward compatibility: prior to classes, constructor functions
// (ordinary functions, invoked via the new operator) were often used as factories for objects
// That explains why classes are functions:
console.log("typeof Person: ", typeof Person);

// Don't confuse .__proto__ and .prototype
// --> __proto__ is a pseudo-property for accessing the prototype of an object.
// --> .prototype is a normal property that is only special due to how the new operator uses it.
//      Person.prototype does not point to the prototype of Person, it points to the prototype
//      of all instances of Person.
assert.equal(Object.getPrototypeOf(jane), Object.getPrototypeOf(tarzan));
assert.notEqual(Object.getPrototypeOf(jane), Object.getPrototypeOf(obj));

// Person.prototype.constructor points back to Person!!!
assert.equal(Person.prototype.constructor, Person);

// This setup also exists due to backward compatibility. But it has two additional benefits.
// 1) each instance of a class inherits property .constructor. Therefore,
// given an instance, you can make “similar” objects using it
const cheeta = new jane.constructor("Cheeta"); // cheeta is also an instance of Person
assert.equal(cheeta instanceof Person, true);

// 2) Second, you can get the name of the class that created a given instance
assert.equal(jane.constructor.name, "Person");

// ### prototype properties vs static properties
class Foo {
  constructor(prop) {
    this.prop = prop;
  }
  protoMethod() {
    return "protoMethod";
  }
  get protoGetter() {
    return "protoGetter";
  }
  static staticMethod() {
    return "staticMethod";
  }
  static get staticGetter() {
    return "staticGetter";
  }
}

const foo = new Foo(123);
console.log(foo.prop, foo.protoMethod(), foo.protoGetter);
console.log(Foo.staticMethod(), Foo.staticGetter);

// ### Why classes are recommeded
// -> Classes are a common standard for object creation and inheritance that
//    is now widely supported across frameworks
// -> They help tools such as IDEs and type checkers with their work and enable
//    new features there.
// -> If you come from another language you can get started more quickly.
// -> JavaScript engines optimize them (faster that use custom inheritance library)
// -> You can subclass built-in constructor functions such as Error.

// That doesn’t mean that classes are perfect:
// -> There is a risk of overdoing inheritance.
// -> There is a risk of putting too much functionality in classes
// -> How they work superficially and under the hood is quite different
//    (in order to keep backward compatibility)

// ### Private data for classes
// Some techniques for hiding some of the data of an object from the outside

// A) Makes a property private by prefixing its name with an underscore
class CountdownA {
  constructor(counter, action) {
    this._counter = counter;
    this._action = action;
  }
  dec() {
    this._counter--;
    if (this._counter === 0) {
      this._action();
    }
  }
}
// But the two properties aren’t really private:
assert.deepEqual(Object.keys(new CountdownA()), ["_counter", "_action"]);

// B) Another technique is to use WeakMaps (explained later)
const _counter = new WeakMap();
const _action = new WeakMap();

class CountdownB {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

// The two pseudo-properties are truly private:
assert.deepEqual(Object.keys(new CountdownB()), []);

// ### Subclassing
// Classes can also subclass (“extend”) existing classes
class Employee extends Person {
  constructor(name, title) {
    super(name);    // you must call the super-constructor via super() before you can access this.
    this.title = title;
  }
  describe() {
    return super.describe() + ` (${this.title})`;
  }
}

const johnny = new Employee("Johnny", "actor");
assert.equal(johnny.describe(), "Person named Johnny (actor)");
