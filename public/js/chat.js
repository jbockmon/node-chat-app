var socket = io();

function scrollToBottom() {
   var chatContainer = $('.chat__container');
   var messages = $('#messages');
   var newMessage = messages.children('li:last-child');

   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();

   console.log(`clientHeight: ${clientHeight} `);
   console.log(`scrollTop: ${scrollTop} `);
   console.log(`scrollHeight: ${scrollHeight} `);
   console.log(`newMessageHeight: ${newMessageHeight} `);
   console.log(`lastMessageHeight: ${lastMessageHeight} `);

   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
   }

}

   socket.on('connect', function () {
      var params = $.deparam(window.location.search);

      socket.emit('join', params, function(err) {
         if (err) {
            alert(err);
            window.location.href = '/';
         } else {
            console.log('No Error');
         }
      });
   });

   socket.on('disconnect', function() {
      console.log('Server connection dropped');
   });

   socket.on('newMessage', function (message) {
      var formattedTime = moment(message.createdAt).format('h:mm:ss a');
      var template = $("#message-template").html();
      var html = Mustache.render(template, {
         text: message.text,
         from: message.from,
         createdAt: formattedTime
      });

      $("#messages").append(html);
      scrollToBottom();
   });

   socket.on('updateUserList', function (users) {
      var ol = $('<ol class="list-unstyled"></ol>');

      users.forEach(function (user) {
         ol.append($('<li></li>').text(user));
      });

      $('#users').html(ol);
   });

   socket.on('newLocationMessage', function(message) {
      var formattedTime = moment(message.createdAt).format('h:mm:ss a');
      
      var template = $("#location-message-template").html();
      var html = Mustache.render(template, {
         from: message.from,
         url: message.url,
         createdAt: formattedTime
      });

      $('#messages').append(html);
      scrollToBottom();
   });

   $('#message-form').on('submit', function (e) {
      e.preventDefault();

      var messageTextbox = $('[name=message]');
      socket.emit('createMessage', {
         text: messageTextbox.val()
      }, function() {
         messageTextbox.val('');
      });
   });

   var locationButton = $('#send-location');
   
   locationButton.on('click', function (e) {
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