const EventEmitter = require('events');

class TaskEventEmitter extends EventEmitter {}

const eventEmitter = new TaskEventEmitter();

// Example listeners (you can add these in your app where needed)
eventEmitter.on('taskAdded', (task) => {
    console.log(`Task added: ${task.name}`);
});

eventEmitter.on('taskCompleted', (task) => {
    console.log(`Task completed: ${task.name}`);
});

module.exports = eventEmitter;
