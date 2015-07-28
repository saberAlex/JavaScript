var express = require('express'),
	app = express(),
	//path is a build in node sevice
	path= require('path'),
	hoganExpress = require('hogan-express'),
	cookieParser = require('cookie-parser');
	session = require('express-session');
	config = require('./config/config.js');
	ConnectMongo = require('connect-mongo')(session);
	mongoose = require('mongoose').connect(config.dbURL);
	var passport = require('passport');
	var FacebookStrategy = require('passport-facebook').Strategy;

//create a new views attribute in apps and the value is directory_name/views
app.set('views', path.join(__dirname, 'views'));

//here we use hogan template engine 
app.engine('html', hoganExpress);
app.set("view engine", 'html');
//set the static atrribute:
//express.static is the only built-in middleware in Express. It is based on serve-static, and is responsible for serving the static assets of an Express application.
app.use(express.static(path.join(__dirname, 'public')));

//session is requires. 
app.use(cookieParser());
//app.use(session({secret:'catscanfly', saveUninitialized: true, resave: true}));

//setting environtment specific:
var env = process.env.NODE_ENV ||'development';
if(env === 'development') {
	app.use(session({
     secret:config.sessionSecret,
     store: new ConnectMongo({
     	mongooseConnection: mongoose.connections[0],
     	stringify: true
     }),
	 saveUninitialized: true,
	 resave: true
	}));

} else {

	app.use(session({secret:'catscanfly', saveUninitialized: true, resave: true}));

}

//this is how we create a schema:
// var userSchema = mongoose.Schema ({
// 	username: String,
// 	password: String,
// 	fullname: String
// })

// var Person = mongoose.model('users', userSchema);
// var John = new Person ( {
// 	username: 'LOu',
// 	password: 'admin',
// 	fullname: 'Lucia Agastya'
// });
// John.save(function(err) {
// 	console.log('done!');
// })

//this is where we want to use passport
app.use(passport.initialize());
app.use(passport.session());

require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);

require('./routes/routes.js')(express, app, passport);

app.listen(3000, function() {
	console.log('Chatcat working on Port 3000');
	console.log('env');
})

//moogose provide scema based solution 
//in order to use mongoose we need to define schema. 
//if we require autentication we just use passport

