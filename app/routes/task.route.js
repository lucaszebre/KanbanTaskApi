const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller'); // Update the path accordingly
const authJwt = require("../middlewares/authJwt")

// Define routes for tasks
router.get('/:boardId/columns/:columnName/tasks',authJwt.authenticateJWT, taskController.getColumnTasks);
router.post('/:boardId/columns/:columnName/tasks',authJwt.authenticateJWT, taskController.createTask);
router.put('/:boardId/columns/:columnName/tasks/:taskId',authJwt.authenticateJWT, taskController.updateTask);
router.delete('/:boardId/columns/:columnName/tasks/:taskId',authJwt.authenticateJWT, taskController.deleteTask);

module.exports = router;
