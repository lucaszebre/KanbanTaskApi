import express from 'express';
import { check } from 'express-validator';
import { login, register,logout } from '../controllers/users/authentication';
export default (router: express.Router) => {
  router.post('/auth/register',register,);
  router.post('/auth/login', login);
  router.post('/logout',logout)
};