const EventEmitter = require('events');

class TaskEventEmitter extends EventEmitter {}

const eventEmitter = new TaskEventEmitter();


eventEmitter.on('taskAdded', (task) => {
    console.log(`Task added: ${task.name}`);
});

eventEmitter.on('taskCompleted', (task) => {
    console.log(`Task completed: ${task.name}`);
});

module.exports = eventEmitter;
