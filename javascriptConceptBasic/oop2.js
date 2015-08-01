//BUILDING object
// function constructors 'new', and the history of javascript. 
// this is at first to attract java developer
// var john = new Person();

function Person() {
	console.log(this);
	console.log('This function is invoke');
	this.first = 'john';
	this.last = 'doe';
	//if I don't return anything the engine give back the object

}
//the rightway to create object in javascript. 

//what do I do here?
var john = new Person();
//new is operator: 1. immediately an empty object is created. then, it's invoke the function with this variable pointing to the object, letting us construct an object via a function. 
console.log(john);
//function constructor --> this is a normal function that used to construct object. 
//Remember the this variable points a new empty object and that object is returned from the function automatically 
//function constructors and .prototype
// now how we use the prototype???, there is another property all function has: .prototype 
Person.prototype.getFullName = function() {
	return this.first + " " + this.last;
} //why would we put this inside: Function takes up memory space, so if I add get fullname to every object, this will get copy of the get full name-- > this will consume lots of memory, thus this is better to put our method to the prototype. 

//DANGEROUS ASIDE! NEW AND FUNCTION 
//function constructor is really just a function. this is where the dangerous part come in.. 
//if I forget the new keyword. this will just become a function. 
//Build in function constructor.. example:
var a new Number(3);//now a is an object. 
//if you want to play with date: moment.js