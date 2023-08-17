const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.board= require("./user.model")
db.column = require('./user.model')
db.task=require('./user.model')

module.exports = db;