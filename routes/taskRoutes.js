const express = require('express');
const router = express.Router();
const TaskController = require('../Controllers/controllers');

router.post('/tasks', TaskController.addTask);
router.put('/tasks/:name/complete', TaskController.completeTask);
router.get('/tasks', TaskController.getTasks);

module.exports = router;
