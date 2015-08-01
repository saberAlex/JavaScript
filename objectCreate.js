Object.create and pure prototypal Inheritance:
this is another way: object.create
// polyfill
//code that adds a feautures which the engine my lack. 
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation'
      + ' only accepts the first parameter.');
    }
    //this create an empty function
    //set the prototype... and then use new.
    function F() {}
    F.prototype = o;
    return new F();
  };
}

var person = {
    firstname: 'Default',
    lastname: 'Default',
    greet: function() {
        return 'Hi ' + this.firstname;   
    }
}

var john = Object.create(person); 
john.firstname = 'John';
john.lastname = 'Doe';
console.log(john);

//ES6 AND CLASSES has the new concepts coming. classes. 
//class in javascript is also an object.
//Syntactic Sugar: A different way to type something that doesn't change how it works under the hood
