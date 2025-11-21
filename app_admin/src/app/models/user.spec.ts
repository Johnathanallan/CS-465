import { User } from './user';
// Test suite for User model
describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
});
