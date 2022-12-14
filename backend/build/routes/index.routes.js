"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = exports.tasksRouter = exports.usersRouter = void 0;
const users_routes_1 = __importDefault(require("./users.routes"));
exports.usersRouter = users_routes_1.default;
const tasks_routes_1 = __importDefault(require("./tasks.routes"));
exports.tasksRouter = tasks_routes_1.default;
const login_routes_1 = __importDefault(require("./login.routes"));
exports.loginRouter = login_routes_1.default;
