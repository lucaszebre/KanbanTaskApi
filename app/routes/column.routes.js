const controller = require('../controllers/column.controller'); // Update the path accordingly

module.exports = function(app) {

// Define routes for tasks
app.get('/user/:userId/boards/:boardId/columns/:columnId', controller.getColumnTask);
app.put('/user/:userId/boards/:boardId/columns/:columnId',controller.updateColumnTask);
app.post('/user/:userId/boards/:boardId',controller.createColumns);
app.delete('/user/:userId/boards/:boardId/columns/:columnId',controller.deleteColumns);

}