"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("md5"));
const Task_1 = __importDefault(require("../database/models/Task"));
const User_1 = __importDefault(require("../database/models/User"));
class TasksService {
    constructor() {
        this.getTasks = () => __awaiter(this, void 0, void 0, function* () {
            const tasksList = yield Task_1.default.findAll({
                include: { model: User_1.default, as: 'user', attributes: { exclude: ['password'] } },
            });
            if (!tasksList)
                return null;
            return tasksList;
        });
        this.getTaskById = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const task = yield Task_1.default.findOne({
                where: { id: this.id },
                include: [
                    { model: User_1.default, as: 'user', attributes: { exclude: ['id', 'password'] } },
                ],
            });
            if (!task)
                return null;
            return task.dataValues;
        });
        this.getTaskByTitle = (receivedTitle) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedTitle)
                return null;
            this.title = receivedTitle;
            const task = yield Task_1.default.findOne({
                where: { title: this.title },
                include: [
                    { model: User_1.default, as: 'user', attributes: { exclude: ['id', 'password'] } },
                ],
            });
            if (!task)
                return null;
            return task.dataValues;
        });
        this.createTask = (receivedTask) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedTask)
                return null;
            this.description = receivedTask.description;
            this.userId = receivedTask.userId;
            const taskExists = yield TasksService.taskExists(this.description, this.userId);
            if (taskExists)
                return null;
            const newTask = yield Task_1.default.create(Object.assign({}, receivedTask));
            if (!newTask)
                return null;
            return newTask.dataValues;
        });
        this.updateTask = (receivedTask) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedTask || !receivedTask.id)
                return null;
            this.id = receivedTask.id;
            const taskToUpdate = yield Task_1.default.findByPk(this.id);
            if (!taskToUpdate)
                return null;
            if (receivedTask.title) {
                this.title = receivedTask.title;
                yield taskToUpdate.update({ title: receivedTask.title });
            }
            if (receivedTask.description && receivedTask.userId) {
                this.description = receivedTask.description;
                this.userId = receivedTask.userId;
                const alreadyExists = yield TasksService.taskExists(this.description, this.userId); // To update the task description, this verification is needed.
                if (alreadyExists)
                    return null;
                yield taskToUpdate.update({ email: this.description });
            }
            if (receivedTask.status) {
                yield taskToUpdate.update({ password: (0, md5_1.default)(receivedTask.status) });
            }
            return taskToUpdate;
        });
        this.deleteTask = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const taskToDelete = yield Task_1.default.findByPk(this.id);
            if (!taskToDelete)
                return null;
            yield taskToDelete.destroy();
            return taskToDelete;
        });
        TasksService.model = new Task_1.default();
    }
}
_a = TasksService;
TasksService.taskExists = (receivedDescription, receivedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.findOne({
        where: { description: receivedDescription },
    });
    const exists = !!task;
    return exists;
});
exports.default = TasksService;
