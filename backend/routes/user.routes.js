import { Router } from "express";
import { deleteUser, getAllUsers, login, signup } from "../controllers/user.controller.js";

const userRouter = Router()


userRouter.get('/', getAllUsers)
userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.delete('/:id', deleteUser)


export default userRouter