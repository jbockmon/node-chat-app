const expect = require('expect');

const {isRealString} = require('./validation');

describe('validation', () => {
   it('should reject non-string values', () => {
      var testVar = 123;
      expect(isRealString(testVar)).toBe(false);
   });

   it('should reject strings with only spaces', () => {
      expect(isRealString('    ')).toBe(false);
   });

   it('should allow strings with non-space chars', () => {
      expect(isRealString('sdfjhn82374')).toBe(true);
   });
});