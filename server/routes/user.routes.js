const { Router } = require("express");
const { deleteUser, getAllUsers, login, signup } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
