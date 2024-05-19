const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');

describe('API Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
        role: 'S'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  // Add more tests as needed
});
