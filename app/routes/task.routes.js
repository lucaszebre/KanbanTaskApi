const controller = require('../controllers/task.controller'); // Update the path accordingly
const authJwt = require("../middlewares/authJwt");

module.exports = function(app) {

// Define routes for tasks
app.get('/boards/:boardId/columns/:columnId',authJwt.authenticateJWT, controller.getColumnTask);
app.post('/boards/:boardId/columns/:columnId',authJwt.authenticateJWT, controller.createTask);
app.put('/boards/:boardId/columns/:columnId/tasks/:taskId',authJwt.authenticateJWT, controller.updateTask);
app.delete('/boards/:boardId/columns/:columnId/tasks/:taskId',authJwt.authenticateJWT, controller.deleteTask);

}
