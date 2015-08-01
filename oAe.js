//type of. instance of,,  hohohoho
//type of is to userd what type of thing the  object is
var a = 3;
console.log(typeof a);

var b = "Hello";
console.log(typeof b);

var c = {};
console.log(typeof c);

var d = [];
console.log(typeof d); // weird!
console.log(Object.prototype.toString.call(d)); // better!

function Person(name) {
    this.name = name;
}

var e = new Person('Jane');
console.log(typeof e);
console.log(e instanceof Person);

console.log(typeof undefined); // makes sense
console.log(typeof null); // a bug since, like, forever...

var z = function() { };
console.log(typeof z);

//use Strict --> processing your code in strictier way. with this we can prevent error under certain cicumtances
var person ;
persom = {}; //if we don't use strict this will not caused an error. 
//some good link about use strict:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode