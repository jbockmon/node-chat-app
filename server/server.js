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
   console.log('New User Connected!');

   socket.on('createMessage', (message) => {
      console.log(message)
   })

   socket.on('disconnect', () => {
      console.log('User Disconnected');
   });   
});



server.listen(3000, () => {
   console.log('Server started on port 3000');
});


