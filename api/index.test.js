const request = require('supertest');

describe('API security and validation', () => {
  beforeAll(() => {
    process.env.ALLOWED_ORIGINS = 'http://allowed.com';
  });

  const app = require('./index');

  test('rejects invalid payload for /generate-guide', async () => {
    const res = await request(app)
      .post('/generate-guide')
      .set('Origin', 'http://allowed.com')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  test('rejects requests from unauthorized origins', async () => {
    const res = await request(app)
      .get('/auth/psn')
      .set('Origin', 'http://unauthorized.com');
    expect(res.status).toBe(403);
  });
});
