import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/todos').then(r => setTodos(r.data));
  }, []);


  const add = async () => {
    await axios.post('http://localhost:5000/todos', { title, username: 'kasun' });
    const r = await axios.get('http://localhost:5000/todos');
    setTodos(r.data);
    setTitle('');
  }


  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App (microservices)</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="new todo" />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map(t => <li key={t.id}>{t.title} (by {t.username})</li>)}
      </ul>
    </div>
  )
}