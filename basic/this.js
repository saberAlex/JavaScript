// var o1 = {
// 	bar: "bar1",
// 	foo: function() {
// 		console.log(this.bar);
// 	}
// };

// var o2 = {bar: "bar2", foo:o1.foo};
// var bar = "bar3";
// var foo = o1.foo;

// o1.foo();
// o2.foo();
// foo();
// console.log(foo);

//The explicit binding:

function foo() {
	console.log(this.bar);
}

var bar = "bar1";
var obj = { bar: "bar2"};

// in the node js, We use the strict mode version of the java sscript, 
//that is the reason why foo() print out undefined, 
//because the this keyword is set to undefined (Not global)
//IMPORTANT
foo();
//the call function will tell the foo to use the object. 
//similar with foo.apply
foo.call(obj);

//sometimes people always say that this binding can be lost
//this keyword to flexible and it can be fustrated.
//This is the hard binding.
//HARD BINDING example

function foo() {
	console.log(this.bar);
} 

var obj = {bar: "bar"};
var obj2 = {bar: "bar2"};
var orig = foo;
//here no matter foo is call it will bind to the first object
//THIS IS THE HARD BINDING
foo = function() { orig.call(obj);}; 

foo();
foo.call(obj2); //this can't override the mechanism of hard binding. 
//Remember:
//1. Hard binding
//2. Explicit binding
//3. Implicit binding
//4. Default binding rule. 

//To work around this you can use bind, like such. 
//this you don't need to do the hard binding.. 

function bind(fn, o) {
	return function() {
		fn.call(o);
	};
}
//Hard binding is already built in. (ECMAScript 5)
//the bind we can do come to the MDN. It has the polyphil?