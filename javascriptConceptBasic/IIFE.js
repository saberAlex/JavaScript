//IIFE.. 
with IIFE we can automatically invoked a function. Example:

var greeting = function() {
	return('hello');
}();
//because we invoke the anynomous function to variable greeting, greeting will be 'hello';

We can do something like this and return 'hello'
console.log(greeting);
However, this will be resulted in an error condition: 
console.log(greeting()); because we cannot invoke a string. 

in javascript this is valid:
3;
'this is strange';

However if I put just anynomous function it result in error.
Because we can invoke a function we can immediately invoked it. we can invoked outside or inside pharentesis.
IIFE in save code. 
If we want the IIFE to be able to be modified, we can put a global object to our variable. And by using IIFE we can polute the global object intentionaly.
