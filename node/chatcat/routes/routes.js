module.exports = function( express, app, passport, config, rooms) {
	var router = express.Router();

	router.get('/', function( request, response, next) {
		response.render('index', {title:"CHATCAT yeah!!!"});
	});
	
	function securePages(request, response, next) {
		if(request.isAuthenticated()) {
			next();
		} else {
			response.redirect('/');
		}
	}

	router.get('/auth/facebook', passport.authenticate('facebook'));
	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/chatrooms',
		failureRedirect: '/'
	}));

	router.get('/chatrooms', securePages, function(request, response, next) {
		response.render('chatrooms',{user:request.user, config: config})
	});

	router.get('/room/:id', securePages, function(request, response, next) {
		var room_name = findTitle(request.params.id);
		response.render('room', {user: request.user, room_number: request.params.id,
		 room_name: room_name, config:config})
	})

	function findTitle(room_id){
		var n = 0;
		while(n< rooms.length) {
			if(rooms[n].room_number == room_id){
				return rooms[n].room_name;
				break;
			} else {
				n++;
				continue;
			}
		}
	}

	//to avoid user without login access our chatroom, we need to create a middleware.
	//middleware is just a mere function with fancy name.
	//this securePages limit the acces based in the login



	router.get('/logout', function(request, response, next){
		request.logout();
		response.redirect('/');
	});



	app.use('/',router);

}