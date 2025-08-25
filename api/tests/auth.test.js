const request = require('supertest');
const app = require('../index');

describe('/auth endpoints', () => {
  describe('/auth/psn', () => {
    test('returns placeholder message for valid GET', async () => {
      const res = await request(app).get('/auth/psn');
      expect(res.status).toBe(200);
      expect(res.text).toBe('PSN authentication endpoint placeholder');
    });

    test('returns 404 for unsupported method', async () => {
      const res = await request(app).post('/auth/psn');
      expect(res.status).toBe(404);
    });

    test('handles query parameters gracefully', async () => {
      const res = await request(app).get('/auth/psn').query({ foo: 'bar' });
      expect(res.status).toBe(200);
      expect(res.text).toBe('PSN authentication endpoint placeholder');
    });
  });

  describe('/auth/xbox', () => {
    test('returns placeholder message for valid GET', async () => {
      const res = await request(app).get('/auth/xbox');
      expect(res.status).toBe(200);
      expect(res.text).toBe('Xbox authentication endpoint placeholder');
    });

    test('returns 404 for unsupported method', async () => {
      const res = await request(app).post('/auth/xbox');
      expect(res.status).toBe(404);
    });

    test('handles query parameters gracefully', async () => {
      const res = await request(app).get('/auth/xbox').query({ foo: 'bar' });
      expect(res.status).toBe(200);
      expect(res.text).toBe('Xbox authentication endpoint placeholder');
    });
  });
});
