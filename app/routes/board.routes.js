const controller = require("../controllers/board.controller");

module.exports = function(app) {
app.get('/boards',controller.getUserBoards)
app.put('/boards',controller.updateBoards)
app.post('boards',controller.createBoard)
}