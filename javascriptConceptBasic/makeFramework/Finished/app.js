var g = G$('Jon', 'Doe');
g.greet().setLang('es').greet(true); 
g.update($('#greeting'));
g.HTMLGreeting('#greeting2',true);

$('#login').click(function() {
	var loginGrtr = G$('John', 'Doe');
	//this is we chaining the method.. neat, 
	loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
})