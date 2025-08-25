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
  const { game } = req.body;
  res.json({ message: `AI guide generation scaffold for ${game}` });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
