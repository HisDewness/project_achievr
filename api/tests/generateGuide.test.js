const request = require('supertest');
const app = require('../index');

describe('/generate-guide', () => {
  test('generates guide when game is provided', async () => {
    const res = await request(app).post('/generate-guide').send({ game: 'Halo' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'AI guide generation scaffold for Halo' });
  });

  test('returns 400 when game is missing', async () => {
    const res = await request(app).post('/generate-guide').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid game' });
  });

  test('returns 400 when game is not a string', async () => {
    const res = await request(app).post('/generate-guide').send({ game: 42 });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid game' });
  });
});
