const controller = require("../controllers/board.controller");
const authJwt = require("../middlewares/authJwt")
module.exports = function(app) {

    app.get('/user/:userId',controller.getUserBoards);
    app.get('/user/:userId/boards/:boardId',authJwt.requireAuth,controller.getOneBoard);
    app.put('/user/:userId/boards/:boardId',authJwt.requireAuth,controller.updateBoards);
    app.post('/user/:userId',authJwt.requireAuth,controller.createBoard);
    app.delete('/user/:userId/boards/:boardId',authJwt.requireAuth,controller.deleteBoard);
  
      
}