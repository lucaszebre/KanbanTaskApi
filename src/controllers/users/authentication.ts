import express from 'express';
import { UserModel } from '../../db/user';
import { NextFunction } from 'express';
import { LoginType } from 'type';
const jwt = require('jsonwebtoken')
export const login = async (req:express.Request, res:express.Response, next:NextFunction) => {
  let { email, password } = req.body;
 
  let existingUser:LoginType;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
 
  res
    .status(200)
    .json({
      success: true,
      data: {
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      },
    });
}

export const register = async (req:express.Request, res:express.Response, next:NextFunction) => {
  const { username, email, password } = req.body;
  const newUser = new UserModel({
    username,
    email,
    password,
  });
 
  try {
    await newUser.save();
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res
    .status(201)
    .json({
      success: true,
      data: { userId: newUser.id,
          email: newUser.email, token: token },
    });
}

export const logout = async (req:express.Request, res:express.Response, next:NextFunction) =>{
    res.clearCookie('AUTH');
    return res.redirect('/');
}