var path = require('path');
var express = require('express');
var socketIO = require('socket.io');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit('newUser', 'Hello! Welcome to the chat app!');

	socket.broadcast.emit('anotherUser', 'New user joined the chat room!');

	socket.on('disconnect', () => {
		console.log('Client disconencted from server');
	});

	socket.on('createMessage', (message) => {
		//to every socket
		io.emit('newMessage', {
			email: message.email,
			message: message.message
		});

		//to every socket except this socket
		/*socket.broadcast.emit('newMessage', {
			email: message.email,
			message: message.message
		});*/

	})
});

server.listen(port, ()=>{
	console.log('Server is up on port ' + port);
});