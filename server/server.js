import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Learn React basics', completed: true },
  { id: 2, title: 'Build Express API', completed: false },
  { id: 3, title: 'Connect frontend and backend', completed: false }
];

app.get('/api/tasks', (req, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
  const title = String(req.body.title || '').trim();
  if (!title) return res.status(400).json({ message: 'Task title is required' });
  const task = { id: Date.now(), title, completed: false };
  tasks.unshift(task);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.completed = Boolean(req.body.completed);
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = tasks.some(t => t.id === id);
  if (!exists) return res.status(404).json({ message: 'Task not found' });
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`TaskFlow API running on http://localhost:${PORT}`));
