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
Object.defineProperty(exports, "__esModule", { value: true });
const jwtGenerator_1 = __importDefault(require("../helpers/jwtGenerator"));
const Tasks_service_1 = __importDefault(require("../services/Tasks.service"));
class TasksController {
    constructor() {
        this.jwt = jwtGenerator_1.default;
        this.getTasks = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasksList = yield this.service.getTasks();
                if (!tasksList)
                    return res.status(404)
                        .json({ message: 'Can\'t find tasks in our database.' });
                return res.status(200).json(tasksList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getTaskById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return null;
                const { authorization } = req.headers;
                if (!authorization)
                    return res.status(401)
                        .json({ message: 'Token not found.' });
                const token = yield jwtGenerator_1.default.verify(authorization);
                if (!token)
                    return res.status(400).json({ message: 'We can\'t find token data for this person.' });
                this.id = Number(id);
                const task = yield this.service.getTaskById(this.id);
                if (!task)
                    return res.status(400)
                        .json({ message: 'Can\'t find this task.' });
                return res.status(200).json(task);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getTaskByTitle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { title } = req.query;
                if (!title)
                    return res.status(400)
                        .json({ message: 'Not query parameter title to search.' });
                this.title = title === null || title === void 0 ? void 0 : title.toString();
                if (!this.title)
                    return null;
                const task = yield this.service.getTaskByTitle(this.title);
                if (!task)
                    return res.status(404)
                        .json({ message: 'Task not found.' });
                return res.status(200).json(task);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.task = req.body;
                const newTask = yield this.service.createTask(this.task);
                if (!newTask)
                    return res.status(400).json({
                        message: `Can\'t rgister this task.`,
                    });
                return res.status(201).json({ task: newTask });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'No data to update.' });
                const task = Object.assign(Object.assign({}, req.body), { id });
                const updatedTask = yield this.service.updateTask(task);
                if (!updatedTask)
                    return res.status(403)
                        .json({
                        message: 'Could not register, probably ' +
                            'already exists a task with this description.'
                    });
                return res.status(200).json(updatedTask);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.deleteTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Please give us an id to exclude.',
                    });
                this.id = Number(id);
                const taskDeleted = yield this.service.deleteTask(this.id);
                if (!taskDeleted)
                    return res.status(404)
                        .json({ message: `Unable to find a task with the id ${id}` });
                return res.status(202).json({ message: 'Record successfully deleted.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Tasks_service_1.default();
    }
}
exports.default = new TasksController();
