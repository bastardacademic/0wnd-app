const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Ensure server exports the app
const expect = chai.expect;
chai.use(chaiHttp);

describe('Habit API', () => {
  it('should fetch habit data for the user', (done) => {
    chai.request(server)
      .get('/api/habits')
      .set('Authorization', 'Bearer <TOKEN>') // Replace <TOKEN> with a valid token or mock
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new habit', (done) => {
    chai.request(server)
      .post('/api/habits')
      .send({ title: 'New Habit', frequency: 'Daily' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.title).to.equal('New Habit');
        done();
      });
  });
});
