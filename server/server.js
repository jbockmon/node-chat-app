const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);      //needed for socket.io
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

   socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

   socket.on('createMessage', (message, callback) => {
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback('This is from the server');
   });

   socket.on('disconnect', () => {
      console.log('User Disconnected');
   });   
});



server.listen(3000, () => {
   console.log('Server started on port 3000');
});


