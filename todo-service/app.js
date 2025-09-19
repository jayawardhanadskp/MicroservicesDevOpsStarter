const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let todos = [];
let idSeq = 1;

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', async (req, res) => {
  const { title, username } = req.body;
  const todo = { id: idSeq++, title, username };
  todos.push(todo);

  try {
    await fetch('http://notification:6000/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'todo-created', todo })
    });
  } catch (e) {
    console.warn('notification failed', e.message);
  }

  res.json(todo);
});

app.listen(5000, () => console.log('todo-service running on port 5000'));
