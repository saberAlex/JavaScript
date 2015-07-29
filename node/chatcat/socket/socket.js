module.exports = function(io, rooms) {
	var chatrooms = io.of('/roomlist').on('connection', function(socket){
		console.log('connection extablied on the server');
					socket.emit('roomupdate', JSON.stringify(rooms));

		socket.on('newroom', function(data){
			rooms.push(data);
			socket.broadcast.emit('roomupdate',JSON.stringify(rooms));
			socket.emit('roomupdate', JSON.stringify(rooms));
		})

	})

	function getUsersFromRoom(room){
		var usersArray = [];
		var nsp = io.of('/messages');
		var clientsInRoom = nsp.adapter.rooms[room];
		for(var client in clientsInRoom){
		usersArray.push(nsp.connected[client]);
		}
		return usersArray;
}

	var messages = io.of('/messages').on('connection', function(socket){
		console.log("Connected to the chatroom !");
		socket.on('joinroom', function(data) {
			socket.username = data.user;
			socket.userPic = data.userPic;
			socket.join(data.room);
		})
			socket.on('newMessageEvent', function(data) {
				socket.broadcast.to(data.room_number).emit('messagefeed', JSON.stringify(data));
				//socket.broadcast.to(data.room_number).emit('messagefeed', JSON.stringify(data));

			});

				function updateUserList(room, updateAll){
			//var getUsers = io.of('/messages').clients(room);
			var getUsers = getUsersFromRoom(room);
			var userlist = [];
			for(var i in getUsers){
				userlist.push({user:getUsers[i].username, userPic:getUsers[i].userPic});
			}
			socket.to(room).emit('updateUsersList', JSON.stringify(userlist));

			if(updateAll){
				socket.broadcast.to(room).emit('updateUsersList', JSON.stringify(userlist));
			}
		}

		socket.on('updateList', function(data){
			updateUserList(data.room);
		})
	})

}