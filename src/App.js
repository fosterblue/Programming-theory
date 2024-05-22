import React, { useState, useEffect } from 'react';
import { getTasks, addTask, completeTask } from './api';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks();
                setTasks(response.data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        try {
            const response = await addTask({ name: newTaskName });
            setTasks([...tasks, response.data]);
            setNewTaskName('');
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const handleCompleteTask = async (name) => {
        try {
            const response = await completeTask(name);
            const updatedTasks = tasks.map(task =>
                task.name === name ? response.data : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to complete task:', error);
        }
    };

    return (
        <div className="App">
            <h1>Task Management</h1>
            <input
                type="text"
                value={newTaskName}
                onChange={e => setNewTaskName(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.name}>
                        {task.name} {task.done ? '(Done)' : ''}
                        {!task.done && <button onClick={() => handleCompleteTask(task.name)}>Complete</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
