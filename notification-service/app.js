const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/notify', (req, res) => {
  const { type, todo } = req.body;
  console.log('[notification] event', type, todo);
  res.json({ ok: true });
});

app.listen(6000, () => console.log('notification-service running on port 6000'));
