const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);      //needed for socket.io
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat app!',
      createdAt: new Date().getTime()
   });

   socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: "So and so joined the room",
      createdAt: new Date().getTime()
   });

   socket.on('createMessage', (message) => {
      io.emit('newMessage', {
         from: message.from,
         text: message.text,
         createdAt: new Date().getTime()
      });
   })

   socket.on('disconnect', () => {
      console.log('User Disconnected');
   });   
});



server.listen(3000, () => {
   console.log('Server started on port 3000');
});


