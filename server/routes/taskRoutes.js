const express = require('express');
const router = express.Router();
const Task = require('../Models/task');
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.addTask);
router.get('/tasks', taskController.getTasks);
router.put('/tasks/:name/complete', taskController.completeTask);

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/tasks', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        done: false
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/tasks/:name/complete', async (req, res) => {
    try {
        const task = await Task.findOne({ name: req.params.name });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.done = true;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
