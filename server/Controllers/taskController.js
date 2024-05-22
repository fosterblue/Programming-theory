const taskService = require('../services/taskService');

exports.addTask = async (req, res) => {
    try {
        const task = await taskService.addTask(req.body.name);
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    const tasks = await taskService.getTasks();
    res.status(200).send(tasks);
};

exports.completeTask = async (req, res) => {
    try {
        const task = await taskService.completeTask(req.params.name);
        res.status(200).send(task);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};
