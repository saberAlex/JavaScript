/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// Sign User Up
	
	checkUser: function(request, response) {
		if(!request.session.me) {
			console.log("You are not loggedin")
			return response.view("login");
		} else {
			console.log("We are loggin");
			return response.view("dashboard");
		}
	},
	getUser: function(request, response) {
		console.log("Running getUser");
		User.findOne({
			id: request.session.me
		}, function(err, user){
			if(err) {
				response.negotiate(err);
			}
			return response.send(user);
		})
	}
};

