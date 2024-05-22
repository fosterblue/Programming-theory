const TaskService = require('../services/taskService');

class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    async addTask(req, res) {
        try {
            const { name } = req.body;
            const task = await this.taskService.createTask(name);
            return res.status(201).json(task);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async completeTask(req, res) {
        try {
            const { name } = req.params;
            const task = await this.taskService.markTaskAsDone(name);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getTasks(req, res) {
        try {
            const tasks = await this.taskService.getAllTasks();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TaskController(new TaskService());
