const controller = require('../controllers/task.controller'); // Update the path accordingly
const authJwt = require("../middlewares/authJwt");

module.exports = function(app) {

// Define routes for tasks
app.get('/user/:userId/boards/:boardId/columns/:columnId',authJwt.requireAuth, controller.getColumnTask);
app.post('/user/:userId/boards/:boardId/columns/:columnId',authJwt.requireAuth, controller.createTask);
app.put('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId',authJwt.requireAuth, controller.updateTask);
app.delete('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId',authJwt.requireAuth, controller.deleteTask);

}
