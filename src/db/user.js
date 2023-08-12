const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user_id:{type:String,required:true},
    email: { type: String, required: true },
    username: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  });
