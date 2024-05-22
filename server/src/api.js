import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTasks = () => apiClient.get('/tasks');
export const addTask = (task) => apiClient.post('/tasks', task);
export const completeTask = (name) => apiClient.put(`/tasks/${name}/complete`);
