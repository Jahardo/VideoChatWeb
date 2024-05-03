import {Router} from "express";
import {userController} from "../controllers/userController.js";
import { authMiddleware } from "../middlewates/authMiddleware.js";

export const userRouter =Router();
const controller = new userController()
userRouter.post('/login',controller.login)
userRouter.get('/auth',authMiddleware,controller.check)
userRouter.post('/registration',controller.registration)
userRouter.get('/test',controller.test)
userRouter.post('/changeImg',controller.changeImg)
//userRouter.get('/:id')