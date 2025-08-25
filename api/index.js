const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

dotenv.config();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
};

const app = express();
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

const withErrorHandling = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((v) => v.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return next({ status: 400, errors: errors.array() });
};

app.get(
  '/auth/psn',
  withErrorHandling(async (req, res) => {
    res.send('PSN authentication endpoint placeholder');
  }),
);

app.get(
  '/auth/xbox',
  withErrorHandling(async (req, res) => {
    res.send('Xbox authentication endpoint placeholder');
  }),
);

app.post(
  '/generate-guide',
  validate([body('game').isString().trim().notEmpty()]),
  withErrorHandling(async (req, res) => {
    const { game } = req.body;
    res.json({ message: `AI guide generation scaffold for ${game}` });
  }),
);

app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  if (err.status === 400 && err.errors) {
    return res.status(400).json({ errors: err.errors });
  }

  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

module.exports = app;

