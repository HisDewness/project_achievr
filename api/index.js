const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/auth/psn', (req, res) => {
  res.send('PSN authentication endpoint placeholder');
});

app.get('/auth/xbox', (req, res) => {
  res.send('Xbox authentication endpoint placeholder');
});

app.post('/generate-guide', (req, res) => {
  const { game } = req.body || {};
  if (typeof game !== 'string' || game.trim() === '') {
    return res.status(400).json({ error: 'Invalid game' });
  }
  res.json({ message: `AI guide generation scaffold for ${game}` });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

module.exports = app;
