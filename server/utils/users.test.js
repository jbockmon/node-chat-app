const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
   var users;

   beforeEach(() => {
      users = new Users();
      users.users = [{
         id: '1',
         name: 'Mike',
         room: 'lounge'
      }, {
         id: '2',
         name: 'Jenny',
         room: 'chicken'
      }, {
         id: '3',
         name: 'Ben',
         room: 'lounge'
      }]   
   });

   it('should add new user', () => {
      var users = new Users();
      var user = {
         id: '123',
         name: 'Someone',
         room: 'general'
      };
      var resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
   });

   it('should remove a user', () => {
      var mike = {
         id: '1',
         name: 'Mike',
         room: 'lounge'
      };

      var oldUserLength = users.users.length;
      var user = users.removeUser(mike.id);

      expect(user.id).toBe(mike.id);
      expect(users.getUser(mike.id)).toBe(undefined);
      expect(users.users.length).toBe(oldUserLength -1);
      expect(users.getUserList).not.toContain(mike);
   });

   it('should not remove a user', () => {
      var mike = {
         id: '-1',
         name: 'Mike',
         room: 'lounge'
      };

      var oldUserLength = users.users.length;
      var user = users.removeUser(mike.id);

      expect(users.users.length).toBe(oldUserLength);
   });

   it('should find a user', () => {
      var mike = {
         id: '1',
         name: 'Mike',
         room: 'lounge'
      };

      expect(users.getUser('2')).not.toEqual(mike);
   });

   it('should not find a user', () => {
      expect(users.getUser('-1')).toEqual(undefined);
   });

   it('should return all users in lounge room', () => {
      var userList = users.getUserList('lounge');

      expect(userList).toEqual(['Mike', 'Ben']);
   });

   it('should return all users in chicken room', () => {
      var userList = users.getUserList('chicken');

      expect(userList).toEqual(['Jenny']);
   });
})