// we know that javascript engine has other hidden object as well. 
// example: proto{} --> this is an object that stand by its  own
// prototype chain... this is not scope chain (where we have access to the variable)
// if I have another object, it just another object.


var person = {
	firstname:'Default',
	lastname:'default',
	getName: function() {
		return this.firstname + ' ' + this.lastname;
	}
}

//this should not be done. 
//this is a performance problem --> this line below only for demo
var john = {
	firstname:'John',
	lastname: 'Doe'
}

john.__proto__ = person; //setting the john prototype to person //DONT DO this
console.log(john.getName()); //when this function invoke the execution context know where the object originally. 

var jane = {
	firstname: 'Jane'
}
jane.__proto__ = person;
console.log(jane.getName()); //in here because of protype chain, this keyword still refer to jane (similar to Joe), but it will search for the lastname... 

//Everything in javascript is an object or primitive. every object has a prototype
var a = {};
var b = function() {};
var c = [];

console.log(a.__proto__); //I will get the base object
b.__proto__;
c.__proto__;
console.log(b.__proto__);
console.log(c.__proto__.__proto__);
//THIS is just for the demo purposes, 

//Reflection: an object can look at itself listing and changing its property and method. 
for (var prop in john) { 
//this also look at the object prototype... but what if I just want to know the object itself?? you can use conditional below: 
	if(john.hasOwnProperty(prop)) {
		console.log(prop + ':  ' + john[prop]);
	}
}


/*
I'm Learning!
So I sat down and wrestled with understanding _.extend and createAssigner and found myself making some conclusions. Can someone verify these or tell me if I'm missing something?

1. Currying a function is made possible by closures.

2. _.extend is a curried function.

Since createAssigner takes 2 arguments:

var createAssigner = function(keysFunc, undefinedOnly) {//code};

and _.extend provides a default keysFunc:

_.extend = createAssigner(_.allKeys);

and in usage we only provide 1 argument (john as the obj in createAssigner) and 0 or more extra arguments (jane and jim):

_.extend(john, jane, jim);

Thus, _.extend is a curried function.

3. You can always provide extra arguments to a function, but whether they are used depends on the function. In the case of _.extend, these are handled with the arguments property. This is pretty cool because that means the output of a function can change depending on the existence of arguments.

4. undefinedOnly takes a boolean argument. Enabling it to true makes it so that only undefined properties can be written to.

Notice that in _.extend = createAssigner(_.allKeys), _.allKeys is provided for keysFunc, but nothing is there for undefinedOnly. That means undefinedOnly = undefined.

So in line 108 !undefinedOnly is coerced:

!(undefined) = !(false) = true

Thus, you will always run the code on line 108: obj[key] = source[key].

Suppose you set undefinedOnly to true, you rely on the second check, obj[key] === void 0. void 0 evaluating to undefined so the simplified check is:

if (false || obj[key] === undefined) which becomes

if(obj[key] === undefined)

Thus, you may only run the code on line 108 if obj[key] doesn't already have a value.

*/
