const request = require('supertest');
const app = require('../server');

describe('End-to-End Habit Tracker Flow', () => {
  it('should register a user, create a habit, and mark it complete', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
        role: 'S',
      });
    expect(res.statusCode).toEqual(201);

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });
    expect(loginRes.statusCode).toEqual(200);

    const habitRes = await request(app)
      .post('/api/habits')
      .send({
        title: 'Complete Habit',
        frequency: 'Daily',
      });
    expect(habitRes.statusCode).toEqual(201);
  });
});
