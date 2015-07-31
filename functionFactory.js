//Function factory : return something..

function makeGreeting(language){
	return function(first, last) {
		if(language === 'en') {
			console.log('Hello ' + first);
		}
		if(language ==='es') {
			console.log('Hola ' + first);
		}


	}
}
var greetEnglish = makeGreeting('en'); // this will make the closure lock that the language is en. Because the execution context is still on.. even after we finish the makeGreeting. Everytime we call a function we always create  new execution context.

