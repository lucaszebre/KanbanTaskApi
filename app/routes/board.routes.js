const controller = require("../controllers/board.controller");
const authJwt = require("../middlewares/authJwt")
module.exports = function(app) {

    app.get('/user/:userId',controller.getUserBoards);
    app.get('/user/:userId/boards/:boardId',controller.getOneBoard);
    app.put('/user/:userId/boards/:boardId',controller.updateBoards);
    app.post('/user/:userId',controller.createBoard);
    app.post('/user/:userId/boards/:boardId',controller.createColumns);
    app.delete('/user/:userId/boards/:boardId',controller.deleteBoard);
    app.delete('/user/:userId/boards/:boardId/columns/:columnId',controller.deleteColumns);

}