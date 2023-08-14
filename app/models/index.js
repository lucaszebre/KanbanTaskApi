const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.board= require("./board.model")
db.column = require('./board.model')
db.task=require('./board.model')

module.exports = db;