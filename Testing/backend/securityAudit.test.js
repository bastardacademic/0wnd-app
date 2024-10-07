const chai = require('chai');
const expect = chai.expect;
const encryptChatMessage = require('../middleware/encryptChat');

describe('Encrypt Chat Middleware', () => {
  it('should encrypt a chat message', (done) => {
    const req = { body: { message: 'Hello, world!' } };
    const res = {};
    const next = () => {
      expect(req.body.message).to.not.equal('Hello, world!');
      done();
    };
    encryptChatMessage(req, res, next);
  });
});
