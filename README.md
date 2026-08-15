# TaskFlow — Full Stack Task Manager

A beginner-friendly full-stack web app built with React and Node.js/Express. It demonstrates frontend UI, REST APIs, asynchronous API calls, CRUD operations, and responsive design.

## Features
- Add tasks
- Mark tasks complete/incomplete
- Delete tasks
- Filter All / Active / Done
- Responsive UI
- React frontend connected to an Express REST API

## Run locally
### 1. Start backend
```bash
cd server
npm install
npm start
```
Backend: http://localhost:5000

### 2. Start frontend in a second terminal
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Tech Stack
React, Vite, JavaScript, Node.js, Express.js, REST API, CSS, Lucide React

## Note
This demo stores tasks in server memory, so tasks reset when the backend restarts. A future version can add MongoDB for persistent storage and authentication.
