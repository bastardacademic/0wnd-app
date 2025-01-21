const request = require('supertest');
const app = require('../server');

describe('Habit API Tests', () => {
    it('should fetch all habits', async () => {
        const res = await request(app).get('/api/habits');
        expect(res.statusCode).toBe(200);
    });
});
