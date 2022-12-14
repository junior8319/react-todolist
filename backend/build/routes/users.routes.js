"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_controller_1 = __importDefault(require("../controllers/Users.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const validateToken_middleware_1 = __importDefault(require("../middlewares/validateToken.middleware"));
const validateUser_middleware_1 = __importDefault(require("../middlewares/validateUser.middleware"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/users', validateToken_middleware_1.default, Users_controller_1.default.getUsers, error_middleware_1.default.handleErrors);
usersRouter.get('/users/:id', validateToken_middleware_1.default, Users_controller_1.default.getUserById, error_middleware_1.default.handleErrors);
usersRouter.get('/users', validateToken_middleware_1.default, Users_controller_1.default.getUserByName, error_middleware_1.default.handleErrors);
usersRouter.post('/users', validateUser_middleware_1.default, Users_controller_1.default.createUser, error_middleware_1.default.handleErrors);
usersRouter.put('/users/:id', validateToken_middleware_1.default, validateUser_middleware_1.default, Users_controller_1.default.updateUser, error_middleware_1.default.handleErrors);
usersRouter.delete('/users/:id', validateToken_middleware_1.default, Users_controller_1.default.deleteUser, error_middleware_1.default.handleErrors);
exports.default = usersRouter;
