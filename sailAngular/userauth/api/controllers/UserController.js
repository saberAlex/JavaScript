/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// Sign User Up
	signup: function(req, res){
		console.log('Backend Signup');

		var Passwords = require('machinepack-passwords');

		// Encrypt Password
		Passwords.encryptPassword({
			password: req.param('password'),
			difficulty: 10,
		}).exec({
			error: function(err){
				console.log(1);
				return res.negotiate(err);
			},
			success: function(encryptedPassword){
				console.log(2);
				require('machinepack-gravatar').getImageUrl({
					emailAddress: req.param('email')
				}).exec({
					error: function(err){
						return res.negotiate(err);
					},
					success: function(gravatarUrl){
						// Create User
						User.create({
							name: req.param('name'),
							email: req.param('email'),
							password: encryptedPassword,
							lastLoggedIn: new Date(),
							gravatarUrl: gravatarUrl
						}, function userCreated(err, newUser){
							if(err){
								console.log('Error: '+err);
								return res.negotiate(err);
							}

							//SESSION VAR

							console.log('User Added');

							return res.json({
								id: newUser.id
							});
						})
					}
				})
			}
		})
	}, 
	login: function(request, response) {
		User.findOne({
			email: request.param("email")
		}, function foundUser(err,user) {
			if (err) {
				return response.negotiate(err);
			}
			if(!user) {
				return response.notFound();
			}
			require("machinepack-passwords").checkPassword({
				passwordAttempt: request.param("password"),
				encryptedPassword: user.password
			}).exec({
				error: function(err){
					return response.negotiate(err);
				},
				incorrect: function(){
					console.log("Passwor incorrect");
					return response.notFound();
				},
				success: function() {
					request.session.me = user.id;
					console.log("SUCCESS");
					console.log("Login Passed");
					return response.ok();
				}
			})
		})
	},
	logout: function(request, response) {
		User.findOne({id: request.session.me}, function(err, user) {
			if(err) {
				return response.negotiate(err);
			}
			if(!user){
				return response.notFound();
			}
			request.session.me = null;
			return response.redirect("/");
		})
	}
};

