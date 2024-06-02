import express from 'express';
import { UserController } from './user.controller.js';
import { validateToken } from '../../middlewares/jwt.middleware.js';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signup",(req,res,next) => {
    userController.signUp(req,res,next);
})

userRouter.post("/logIn",(req,res,next) => {
    userController.logIn(req,res,next);
})