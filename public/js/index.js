var socket = io();

   socket.on('connect', function() {
      console.log('Connected to server');
   });

   socket.on('disconnect', function() {
      console.log('Server connection dropped');
   });

   socket.on('newMessage', function(message) {
      var formattedTime = moment(message.createdAt).format('h:mm:ss a');
      var template = $("#message-template").html();
      var html = Mustache.render(template, {
         text: message.text,
         from: message.from,
         createdAt: formattedTime
      });

      $("#messages").append(html);
      
      // var li = $('<li></li>');
      
      // li.text(`${message.from} ${formattedTime}: ${message.text}`);
      // $('#messages').append(li);
   });

   socket.on('newLocationMessage', function(message) {
      var formattedTime = moment(message.createdAt).format('h:mm:ss a');
      
      var template = $("#location-message-template").html();
      var html = Mustache.render(template, {
         from: message.from,
         url: message.url,
         createdAt: formattedTime
      });
      // var li = $('<li></li>');
      // var a = $('<a target="_blank"> My current location </a>');

      // li.text(`${message.from} ${formattedTime}: `);
      // a.attr('href', message.url);
      // li.append(a);

      $('#messages').append(html);
   });

   $('#message-form').on('submit', function(e) {
      e.preventDefault();

      var messageTextbox = $('[name=message]');
      socket.emit('createMessage', {
         from: 'User',
         text: messageTextbox.val()
      }, function() {
         messageTextbox.val('');
      });
   });

   var locationButton = $('#send-location');
   
   locationButton.on('click', function(e) {
      if (!navigator.geolocation) {
         return alert('Geolocation not supported by your browser');
      }

      locationButton.attr('disabled', 'disabled').text('Sending location...');

      navigator.geolocation.getCurrentPosition(function(position) {
         socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
         });
         locationButton.removeAttr('disabled').text('Send location');
      }, function() {
            alert('Unable to fetch location');
            locationButton.removeAttr('disabled').text('Send location');
      }
   )
   });