module.exports = function( express, app, passport) {
	var router = express.Router();

	router.get('/', function( request, response, next) {
		response.render('index', {title:"CHATCAT yeah!!!"});
	});

	//this route is activated when we click on the facebook logo in our index.html:
	//	<a href="/auth/facebook"><img src="../images/login_with_facebook.png"></a>
	router.get('/auth/facebook', passport.authenticate('facebook'));
	//once we have authenticate this, we get the token from facebok:
	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/chatrooms',
		failureRedirect: '/'
	}))


	//to avoid user without login access our chatroom, we need to create a middleware.
	//middleware is just a mere function with fancy name.
	//this securePages limit the acces based in the login
	function securePages(request, response, next) {
		if(request.isAuthenticated()) {
			next();
		} else {
			response.redirect('/');
		}
	}


	router.get('/logout', function(request, response, next){
		request.logout();
		response.redirect('/');
	});

	router.get('/chatrooms', securePages, function(request, response, next) {
		response.render('chatrooms',{user:request.user})
	});

	app.use('/',router);

}