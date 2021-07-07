const { Router } = require("express");
const { Authorization } = require("../middlewares/authorization");
const { UserController } = require("./users.controller");


const UserRouter = Router();

UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.get("/", Authorization, UserController.getAll);
UserRouter.get("/me", Authorization, UserController.getMyDate);


module.exports = {
    UserRouter
}