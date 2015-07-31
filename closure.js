//This is hard to understand?
//lets write some code... 

//this is a function that return a function--> this function obviosly cn be invoked as well. 
function greet(whattosay) {
	return function(name) {
		console.log(whattosay + " " + name);
	}
}

greet('Hi')('Tony'); //we invoke a function that return a function that can be invoked as well. 
//lets make some complecated:
var sayHi = greet('Hi');
sayHi('Tony'); 
var whattosay = "hello";
sayHi('Tony'); //still outputted hi tony--> this is because the function inside still refer to the function it's created. this is what we call closure. this is a feature of javascript. Doesn't matter when we invoke the function.
//this is a feature of language that is extremely powerfull. 

//how does this sayHi function  still know whattosay.... ????? 
//this is possible because of closure. 
//First we have the code. 

//classic example:
function buildFunctions() {
	var arr = [];
	for(var i = 0; i < 3; i++) {
		arr.push(
			function() {
				console.log(i);
			}
		);
	}
	return arr;
}
var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();
//what do we expect this will be outputted?
//Remember that we just create the function, not invoking it. 
//This will be resulted in i=3???
//all the result is 3... why??? 
//because it can only be able to tell us when we executed the function, not when the function was created. This may look weird.. but this is reality... so i is 3 by the time we call this function. 
//to make this output 1,2,3...


// function buildFunctions2() {
// 	var arr = [];
// 	for(var i = 0; i < 3; i++) {
// 		//j is the new JS functionality
// 		let j = i;
// 		arr.push(
// 			function() {
// 				console.log(j);
// 			}
// 		);
// 	}
// 	return arr;
// }
// var fs2 = buildFunctions2();

// fs2[0]();
// fs2[1]();
// fs2[2]();

///Closure and callback ////
console.log('closure and callback');

function sayHiLAter() {
	var greeting = 'Hi!';
	setTimeout(function() {
		console.log(greeting);
	}, 3000);
}

sayHiLAter();

//Callback function: a function you give to another function, to be run when the other function is finished.
//invoke the function, once we finish, it calls back the other function. Example:

function tellMeWhenDone(callback) {
	var a = 1000;
	var b = 3000;
	callback();
}

tellMeWhenDone(function() {
	console.log('I am done');
});
//THIS IS REALLY IMPORTANT
/*

The key here is remembering that a function's scope is defined by it's lexical position in the code. Where was it created?

In the first example you cite, the callback was passed in, but created outside of that function. So it has no access to a or b down the scope chain.

*/