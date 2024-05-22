const Task = require('../Models/task');
const ITaskService = require('../interfaces/ITaskService');
const eventEmitter = require('../utils/eventEmitter');

class TaskService {
    async addTask(name) {
        if (!name) {
            throw new Error('Task name is required');
        }
        const task = new Task({ name });
        await task.save();
        eventEmitter.emit('taskAdded', task);
        return task;
    }

    async getTasks() {
        return await Task.find();
    }

    async completeTask(name) {
        const task = await Task.findOneAndUpdate(
            { name },
            { done: true },
            { new: true }
        );
        if (!task) {
            throw new Error('Task not found');
        }
        eventEmitter.emit('taskCompleted', task);
        return task;
    }
}

module.exports = new TaskService();
