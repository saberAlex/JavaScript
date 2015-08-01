//make the code safe: using the IIFE
//this function pass the global and jQuery (imitating jQuery structure)
//this is also make private/encapsulation?
(function(global, jQuery){

	var Greetr = function(firstname, lastname, language) {
		//return new and set the function
		return new Greetr.init(firstname, lastname, language);
	}
	//create function constructor. 
	//this is to safe memory.. 
	var supportedLangs = ['en', 'es']; //this variable won't /can't be access anywhere. Why? because the lexical environtment of this variable is inside the IIFE except I desire to do so. 
	var greetings = {
		en: 'Hello', 
		es: 'Hola'
	};

	var formalGrettings = {
		en: 'Greetings',
		es: 'Saludos'
	};

	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	}

	Greetr.prototype = {
		fullname: function() {
			return this.firstname + ' ' + this.lastname;
		},
		validate: function() {
			if(supportedLangs.indexOf(this.language) === -1) {
				throw "Invalid language";
			}
		},
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstname +'!';
		}, 
		formalGrettings: function() {
			return formalGrettings[this.language] + ', ' + this.fullname();
		}, 
		greet: function(formal) {
			var msg;
			//if undefined or null will be corrected to false:
			if(formal) {
				msg = this.formalGrettings();
			} else {
				msg = this.greeting();
			} 

			if(console) {
				console.log(msg);
			}
			//this refer to the calling object at execution time and make this method chainable.
			return this;

		}, 
		log: function() {
			if(console) {
				console.log(logMessages[this.language] + ' ' + this.fullname());
			}
		}, 
		setLang: function(lang) {
			this.language = lang;
			this.validate();
			return this;
		},
		update: function($) {
			$.html(this.greeting());
			return this;
		},
		HTMLGreeting: function(selector, formal) {
			if(!$) {
				throw 'jQuery not loaded';
			}
			if(!selector) {
				throw 'Missing jQuery selector';
			}

			var msg;
			if(formal) {
				msg = this.formalGrettings();
			} else {
				msg = this.greeting();
			}

			$(selector).html(msg);
			return this;

		}


	};
	Greetr.init = function(firstname, lastname, language) {

		var self = this;
		//setting up default property
		self.firstname = firstname || '';
		self.lastname = lastname || '';
		self.language = language || 'en';
		//G.init need to point its prototype.
		self.validate(); 
	}
	//any object init need to be prototype to the Greetr.prototype
	Greetr.init.prototype = Greetr.prototype;

	//giving aliases to G$ -->
	//this make that global.Greetr anf global.G$ refer to  Greetr
	global.Greetr = global.G$ = Greetr;

	//Properties and chainable method to the object. 
	//adding the jQuery support. 

})(window, jQuery);