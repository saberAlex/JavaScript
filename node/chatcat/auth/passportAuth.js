module.exports = function(passport, FacebookStrategy, config, mongoose) {

	var chatUser = new mongoose.Schema({
		profileID: String,
		fullname: String,
		profilePic: String
	});

	var userModel = mongoose.model('chatUser', chatUser);

	passport.serializeUser(function(user, done) {
		//user/id is the id of mongo lab.
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		userModel.findById(id, function(err, user) {
			done(err, user);
		})
	})

	passport.use(new FacebookStrategy({
		clientID: config.fb.appID,
		clientSecret: config.fb.appSecret,
		callbackURL: config.fb.callbackURL,
		profileFields: ['id', 'displayName', 'photos']
		//what is a done?
	}, function(accessToken, refreshToken, profile, done) {
		//check if the user exist in mongo db
		//if not, create one. 
		//if exists, we simply return the profile. 
		userModel.findOne({'profileID':profile.id}, function(err, result){
			if(result) {
				done(null, result);
			} else {
				// Create new user:
				var newChatUser = new userModel( {
					profileID: profile.id,
					fullname: profile.displayName,
					profilePic: profile.photos[0].value || ''
				});

				newChatUser.save(function(err) {
					done(null, newChatUser);
				} )
			}

		})
	}));

}

//When we try to connect to facebook there are several things happen. 
//First, it our application will ask for an authentication Request 

//OurApp -- authentication request -- Facebook apps -- the Facebook will give us: accessToken, refreshToken, profile
//accessToken is limited, so we need to use refreshToken. Facebook using Auth 2.0