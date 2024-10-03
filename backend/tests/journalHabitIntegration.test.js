const request = require('supertest');
const app = require('../server');

describe('Journal and Habit Integration', () => {
  it('should create a journal entry and reflect habit progress', async () => {
    const res = await request(app)
      .post('/api/journal')
      .send({
        content: 'Completed my habit today!',
        category: 'Private',
      });
    expect(res.statusCode).toEqual(201);

    const habitRes = await request(app).get('/api/habits/completion-status');
    expect(habitRes.body.completed).toEqual(true);
  });
});
