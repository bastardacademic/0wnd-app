const request = require('supertest');
const app = require('../server');

describe('Habit Tracking API', () => {
    it('should create a new habit', async () => {
        const res = await request(app)
            .post('/api/habits')
            .send({
                title: 'Exercise',
                frequency: 'Daily',
                userId: '60d0fe4f5311236168a109ca'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('habitId');
    });
});
