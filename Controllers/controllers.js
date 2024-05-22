const Task = require('../Models/model');

class TaskController {
    static async addTask(req, res) {
        const { name } = req.body;
        const task = new Task({ name });
        await task.save();
        res.status(201).json(task);
    }

    static async completeTask(req, res) {
        const { name } = req.params;
        const task = await Task.findOne({ name });
        if (task) {
            task.done = true;
            await task.save();
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }

    static async getTasks(req, res) {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
}

module.exports = TaskController;
