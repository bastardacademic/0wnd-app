const request = require('supertest');
const app = require('../server');

describe('Habit API Tests', () => {
  it('should create a new habit', async () => {
    const res = await request(app)
      .post('/api/habits')
      .send({
        title: 'Daily Meditation',
        frequency: 'Daily',
        userId: 'user123',
      });
    expect(res.statusCode).toEqual(201);
  });

  it('should retrieve all habits for a user', async () => {
    const res = await request(app)
      .get('/api/habits')
      .set('Authorization', Bearer token);
    expect(res.statusCode).toEqual(200);
  });
});
