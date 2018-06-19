var expect = require('expect');

var {generateMessage} = require('./message');

describe('generageMessage', () => {
    it('should generate the correct message object', () => {
        var testObj = {
            'from': 'sender',
            'text': 'message text here'
        }
        var message = generateMessage(testObj.from, testObj.text);

        expect(message.from).toBe(testObj.from);
        expect(message.text).toBe(testObj.text);
        expect(typeof message.createdAt).toEqual('number');


    });
});