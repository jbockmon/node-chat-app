var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
   it('should generate the correct message object', () => {
      var testObj = {
         from: 'sender',
         text: 'message text here'
      }
      var message = generateMessage(testObj.from, testObj.text);

      expect(message.from).toBe(testObj.from);
      expect(message.text).toBe(testObj.text);
      expect(typeof message.createdAt).toEqual('number');
   });
});

describe('generateLocationMessage', () => {
   it('should generate the correct location object', () => {
      var testObj = {
         from: 'sender',
         url: `https://www.google.com/maps?q=50,50`,
         createdAt: new Date().getTime()
      };
      var message = generateLocationMessage(testObj.from, 50, 50);

      expect(message.from).toBe(testObj.from);
      expect(message.url).toBe(testObj.url);
      expect(typeof message.createdAt).toEqual('number');
   });
})