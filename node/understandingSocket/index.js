//setting up the application
//Exxpress initialize the app to be function handler that can supply to an HTTP server
var app = require('express')();
var http= require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(request, response) {
	//response.send('<h1> Hello world </h1>');
	//serving an index html:
	response.sendFile(__dirname + '/index.html');
});

//Notice that I initialize a new instance of socket.io by passing the http object
//then  I listen on the connection for incoming socket. 
//our next task is to set the client into.
io.on('connection', function(socket){
	//now we broadcast to all user"
    //socket.broadcast.emit('hi');
	console.log('a user is connected');
	//We can also ask for disconnection:
	socket.on('disconnect', function() {
		console.log("I'm out of here");
	});

	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		//because we emit a chat message, we can capture of this emitting signal in the client
		// client -- server -- client
		//back to index.html
		io.emit('chat message', msg);
	})
})

//listen to request
http.listen(3000, function(){
	console.log('listening on port 3000');
});

//socket io has two parts: a server that integrates with the NODE js http server
//A client library that loads on the browser side. 
//The main idea is we can send and  receive any event I want with any data I want
//We can emit/produce an event

