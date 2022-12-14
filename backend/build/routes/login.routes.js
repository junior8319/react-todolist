"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = __importDefault(require("../controllers/Login.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const validateLogin_middleware_1 = __importDefault(require("../middlewares/validateLogin.middleware"));
const validateToken_middleware_1 = __importDefault(require("../middlewares/validateToken.middleware"));
const loginRouter = (0, express_1.Router)();
loginRouter.post('/login', validateLogin_middleware_1.default, Login_controller_1.default.login, error_middleware_1.default.handleErrors);
loginRouter.post('/validate', validateToken_middleware_1.default, Login_controller_1.default.userAuth, error_middleware_1.default.handleErrors);
exports.default = loginRouter;
