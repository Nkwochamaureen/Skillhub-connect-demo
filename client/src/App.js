import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h1>Serenity Task Manager</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;