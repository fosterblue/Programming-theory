const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRoutes = require('../routes/taskRoutes');
const Task = require('../Models/task');

const app = express();
app.use(bodyParser.json());
app.use('/api', taskRoutes);

beforeAll(async () => {
    // Подключение к тестовой базе данных MongoDB
    await mongoose.connect('mongodb://localhost:27017/taskdb_test', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Очистка базы данных и закрытие соединения
    await Task.deleteMany({});
    await mongoose.connection.close();
});

describe('Task API', () => {
    beforeEach(async () => {
        // Очистка базы данных перед каждым тестом
        await Task.deleteMany({});
    });

    test('POST /api/tasks adds a task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ name: 'Test Task' });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Task');
        expect(response.body.done).toBe(false);
    });

    test('POST /api/tasks returns 400 if no name provided', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Task name is required');
    });

    test('PUT /api/tasks/:name/complete marks a task as done', async () => {
        const task = new Task({ name: 'Test Task' });
        await task.save();

        const response = await request(app)
            .put('/api/tasks/Test%20Task/complete');

        expect(response.status).toBe(200);
        expect(response.body.done).toBe(true);
    });

    test('PUT /api/tasks/:name/complete returns 404 if task not found', async () => {
        const response = await request(app)
            .put('/api/tasks/Nonexistent%20Task/complete');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });

    test('GET /api/tasks retrieves all tasks', async () => {
        const tasks = [
            { name: 'Task 1', done: false },
            { name: 'Task 2', done: true }
        ];

        await Task.insertMany(tasks);

        const response = await request(app).get('/api/tasks');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe('Task 1');
        expect(response.body[1].name).toBe('Task 2');
    });
});
