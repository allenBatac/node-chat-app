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

 	socket.on('createEmailEvent', (newEmail) => {
 		console.log('createEmailEvent ', newEmail);
 	});

	socket.on('disconnect', () => {
		console.log('Client disconencted from server');
	});

	socket.on('createMessage', (message) => {
		io.emit('newMessage', {
			email: message.email,
			message: message.message
		})
	})
});

server.listen(port, ()=>{
	console.log('Server is up on port ' + port);
});