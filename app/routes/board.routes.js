const controller = require("../controllers/board.controller");
const authJwt = require("../middlewares/authJwt")
module.exports = function(app) {

    app.get('/boards',authJwt.authenticateJWT,controller.getUserBoards)
    app.put('/boards',authJwt.authenticateJWT,controller.updateBoards)
    app.post('/boards',authJwt.authenticateJWT,controller.createBoard)
}