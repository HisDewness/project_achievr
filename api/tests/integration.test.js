const request = require('supertest');
const app = require('../index');

describe('integration tests', () => {
  test('sets CORS headers', async () => {
    const res = await request(app).get('/auth/psn');
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });

  test('handles invalid JSON body', async () => {
    const res = await request(app)
      .post('/generate-guide')
      .set('Content-Type', 'application/json')
      .send('{"game": "Halo"');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid JSON' });
  });

  test('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.status).toBe(404);
  });
});
