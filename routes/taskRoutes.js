const Task = require('../models/task');

class TaskController {
    static async addTask(req, res) {
        try {
            const { name } = req.body;
            const task = new Task({ name });
            await task.save();
            return res.status(201).json(task);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async completeTask(req, res) {
        try {
            const { name } = req.params;
            const task = await Task.findOne({ name });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            task.done = true;
            await task.save();
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getTasks(req, res) {
        try {
            const tasks = await Task.find();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TaskController;
