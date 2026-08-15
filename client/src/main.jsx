import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Circle, Trash2, Plus, LayoutDashboard } from 'lucide-react';
import './styles.css';

const API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');

  const loadTasks = async () => {
    const res = await fetch(API);
    setTasks(await res.json());
  };

  useEffect(() => { loadTasks(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    setTitle('');
    loadTasks();
  };

  const toggleTask = async (task) => {
    await fetch(`${API}/${task.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !task.completed }) });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadTasks();
  };

  const visible = useMemo(() => tasks.filter(t => filter === 'all' ? true : filter === 'done' ? t.completed : !t.completed), [tasks, filter]);
  const completed = tasks.filter(t => t.completed).length;

  return <div className="page">
    <header className="nav"><div className="brand"><div className="logo"><LayoutDashboard size={20}/></div><span>TaskFlow</span></div><span className="badge">Full Stack Demo</span></header>
    <main className="container">
      <section className="hero"><div><p className="eyebrow">PERSONAL PRODUCTIVITY</p><h1>Turn plans into progress.</h1><p className="sub">A clean task manager built with React and Node.js.</p></div><div className="stats"><strong>{completed}/{tasks.length}</strong><span>completed</span></div></section>
      <section className="card">
        <form onSubmit={addTask} className="add"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Add a new task..."/><button><Plus size={18}/>Add task</button></form>
        <div className="filters">{['all','active','done'].map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f[0].toUpperCase()+f.slice(1)}</button>)}</div>
        <div className="list">{visible.map(task=><div className="task" key={task.id}><button className="check" onClick={()=>toggleTask(task)}>{task.completed?<span className="checked"><Check size={15}/></span>:<Circle size={21}/>}</button><span className={task.completed?'done':''}>{task.title}</span><button className="delete" onClick={()=>deleteTask(task.id)} aria-label="Delete"><Trash2 size={18}/></button></div>)}{visible.length===0&&<div className="empty">No tasks here yet.</div>}</div>
      </section>
      <p className="tech">React • Vite • Node.js • Express • REST API</p>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />);
