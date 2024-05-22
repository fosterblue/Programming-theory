const Task = require('../Models/task');
const ITaskService = require('../interfaces/ITaskService');

class TaskService extends ITaskService {
    async createTask(name) {
        const task = new Task({ name });
        await task.save();
        return task;
    }

    async markTaskAsDone(name) {
        const task = await Task.findOne({ name });
        if (task) {
            task.done = true;
            await task.save();
        }
        return task;
    }

    async getAllTasks() {
        return await Task.find();
    }
}

module.exports = TaskService;
