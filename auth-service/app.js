const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post('/signup', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });
  users.push({ username });
  res.json({ ok: true, username });
});

app.post('/whoami', (req, res) => {
  const { username } = req.body;
  const found = users.find(u => u.username === username);
  if (!found) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true, username });
});

app.listen(4000, () => console.log('auth-service running on port 4000'));
