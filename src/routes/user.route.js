const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user.controller");

userRouter.get("/", userController.getAllUsers);
userRouter.put("/", userController.updateUser);
userRouter.delete("/", userController.deleteUser);

module.exports = userRouter;
