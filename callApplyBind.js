//Function execution context:
//Variable environtment - 'this' - Outer environtment; this is will be nice if we have the control of that. Here we use call, apply and bind. Remember Function has: name, code(invocable) thus it can access the call(), apply(), and bind()

var person = {
	firstname: 'John',
	lastname: 'Doe',
	getName: function() {
		var name = this.firstname;
		return name;
	}
}

var logName = function(lang1, lang2) {
	console.log(this.getName());
};

//this will cause an error:
//logName() because this inside is the global object.

var logPersonName = logName.bind(person); //now this object reply to this.
logPersonName();
//we can also use bind on the fly when the function is created. 
//.call also let me decide what I want that to be: unlike bind which create a copy, call is execute the function.
logName.call(person);
//a bit different with the apply, the apply method want an array rather than normal list, this is the only different with call and apply, we can use the apply like this:
logName.apply(person,[]);
//we can also do something like this:

var person2 = {
	firstname: 'Luca',
	lastname: 'reto'
}

console.log(person.getName.apply(person2)); //we borrow and bind the 'this' with the object we have assigned.

//function Currying:
function multiply(a,b) {
	return a*b;
}

var multiplyByTwo = multiply.bind(this,2); //the first parameter is always be two in (a always be 2): the bind and this is doing something like this: ( I decide to give permanent value to the first variable.)

/*
function multiplyByTwo(b) {
	a= 2;
	return a*b;
}

*/
console.log(multiplyByTwo(8));
//BIG WORD ALERT:
//function currying: creating a copy of a function but with some preset parameter (this is really useful in math)