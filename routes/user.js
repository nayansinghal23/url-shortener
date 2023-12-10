const express = require("express");
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/", handleUserSignUp);
userRouter.post("/login", handleUserLogin);

module.exports = userRouter;
