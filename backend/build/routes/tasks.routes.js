"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Tasks_controller_1 = __importDefault(require("../controllers/Tasks.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const validateToken_middleware_1 = __importDefault(require("../middlewares/validateToken.middleware"));
const validateTask_middleware_1 = __importDefault(require("../middlewares/validateTask.middleware"));
const tasksRouter = (0, express_1.Router)();
tasksRouter.get('/tasks', validateToken_middleware_1.default, Tasks_controller_1.default.getTasks, error_middleware_1.default.handleErrors);
tasksRouter.get('/tasks/:id', validateToken_middleware_1.default, Tasks_controller_1.default.getTaskById);
tasksRouter.get('/tasks', validateToken_middleware_1.default, Tasks_controller_1.default.getTaskByTitle, error_middleware_1.default.handleErrors);
tasksRouter.post('/tasks', validateToken_middleware_1.default, validateTask_middleware_1.default, Tasks_controller_1.default.createTask, error_middleware_1.default.handleErrors);
tasksRouter.put('/tasks/:id', validateToken_middleware_1.default, validateTask_middleware_1.default, Tasks_controller_1.default.updateTask, error_middleware_1.default.handleErrors);
tasksRouter.delete('tasks/:id', validateToken_middleware_1.default, Tasks_controller_1.default.deleteTask, error_middleware_1.default.handleErrors);
exports.default = tasksRouter;
