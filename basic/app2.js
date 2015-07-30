//Understanding the scope chain. 
//Thing who is created me?

function a() {
	function b() {
	 console.log(myVar);
	}
	var myVar = 2;
	b();
}

a();

//Scope is where a variable is available in your code. 
//What about asynchronous callbacks?
  //Asynchronous: more than one at a time, javascript is synchrounously.. but yet we have event? how is this possible?
  //Let see a code below:

  function waitThreeSeconds() {
  	var ms = 3000 + new Date().getTime();
  	while(new Date() < ms) {}
  		console.log('finished function')
  }

  function clickHandler() {
  	console.log('click event');
  }

  document.addEventListener('click', clickHandler);

  waitThreeSeconds();
  console.log('Finished execution');