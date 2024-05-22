const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('../routes/taskRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api', taskRoutes);

test('POST /api/tasks adds a task', async () => {
    const response = await request(app).post('/api/tasks').send({ name: 'Test Task' });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Task');
    expect(response.body.done).toBe(false);
});

test('PUT /api/tasks/:name/complete marks a task as done', async () => {
    await request(app).post('/api/tasks').send({ name: 'Test Task' });
    const response = await request(app).put('/api/tasks/Test%20Task/complete');
    expect(response.status).toBe(200);
    expect(response.body.done).toBe(true);
});
