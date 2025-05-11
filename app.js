const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ API is working!');
});

app.post('/save-score', (req, res) => {
  const { score } = req.body;
  console.log('Received score:', score);

  pool.query(
    'INSERT INTO scores (score) VALUES (?)',
    [score],
    (err, results) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Score saved!' });
    }
  );
});

app.get('/results', (req, res) => {
  pool.query('SELECT * FROM scores', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
