const controller = require("../controllers/board.controller");
const authJwt = require("../middlewares/authJwt")
module.exports = function(app) {

    app.get('/user/:userId',controller.getUserBoards);
    app.get('/user/:userId/boards/:boardId',controller.getOneBoard);
    app.put('/boards/:boardId',controller.updateBoards);
    app.post('/user/:userId',controller.createBoard);
    app.delete('/user/:userId/boards/:boardId',controller.deleteBoard);
  
      
}