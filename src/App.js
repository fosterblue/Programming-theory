import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    const addTask = () => {
        axios.post('/api/tasks', { name: newTask })
            .then(response => setTasks([...tasks, response.data]))
            .catch(error => console.error(error));
        setNewTask('');
    };

    const completeTask = (name) => {
        axios.put(`/api/tasks/${name}/complete`)
            .then(response => {
                const updatedTasks = tasks.map(task =>
                    task.name === name ? response.data : task
                );
                setTasks(updatedTasks);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="App">
            <h1>Task Management</h1>
            <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.name}>
                        {task.name} {task.done ? '(Done)' : ''}
                        {!task.done && <button onClick={() => completeTask(task.name)}>Complete</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
