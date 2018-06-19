var socket = io();

   socket.on('connect', function() {
      console.log('Connected to server');
   });

   socket.on('disconnect', function() {
      console.log('Server connection dropped');
   });

   socket.on('newMessage', function(message) {
      console.log(message);
   });