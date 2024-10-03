const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Authentication Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        role: 'D',
      });
    expect(res.statusCode).toEqual(201);
  });

  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
  });
});
