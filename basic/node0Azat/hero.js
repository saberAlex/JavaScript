module.exports = function() {
	var name = 'luca';
	console.log(name + name.length);
	
	this.existMethod = function() {
		console.log('this is the method that my module has.');
	}

	function test() {
		console.log('this is a test function');
	}

	var returnMethod = function() {
		console.log("I'm returning this");
	}

	return returnMethod;
}


