//this is a functional inheritance
var weapon = function(name) {
	return {
		name: name,
		power: 0, 
		levelup : function(powerInc) {
			this.power += powerInc;
			console.log(this);
		}

	}
}

var ultima = weapon('ultima');
ultima.levelup(1000);
console.log(ultima.name + ' has power ' + ultima.power);

//common pitfalls:
Leaking vars into global space
using word 'this' context
using wrong == and ===
missing break in a switch case
return?
"pseudo-classical inheritance"

Event-loop?
Node js

node js process information:
process.argv --> this is the argument we enter when we run node js... 
process.env
process.pid

Import:
var fs = require('fs');

Export:
module.exports = function() {

}

Buffer --> Node.js binary data type

var filename = "node0.js";
var path = __dirname + filename;
console.log(path);
console.log(process.cwd());

process.cwd --> looking the current directory;