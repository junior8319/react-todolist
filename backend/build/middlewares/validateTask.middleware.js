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
const Tasks_service_1 = __importDefault(require("../services/Tasks.service"));
const validateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = req.body;
    const { title, description, status, userId } = task;
    const VALID_MIN_DESC_LENGTH = 5;
    const VALID_MAX_DESC_LENGTH = 100;
    const VALID_MAX_TIT_LENGTH = 20;
    if (!title ||
        !description ||
        !status ||
        !userId ||
        title.length === 0 ||
        description.length === 0 ||
        status.length === 0) {
        return res.status(400).json({
            message: 'The fields title, description, status and userId are ' +
                'required to register a new task.',
        });
    }
    if (description.length < VALID_MIN_DESC_LENGTH)
        return res.status(400)
            .json({
            message: 'Description\'s length must be at least ' +
                `${VALID_MIN_DESC_LENGTH} characters long. ` +
                `And you typed ${description.length}.`,
        });
    if (description.length > VALID_MAX_DESC_LENGTH)
        return res.status(400)
            .json({
            message: 'Description\'s length must be a maximum of ' +
                `${VALID_MAX_DESC_LENGTH} characters.` +
                `And you typed ${description.length}.`,
        });
    if (title.length > VALID_MAX_TIT_LENGTH)
        return res.status(400)
            .json({
            message: 'Title\'s length must be a maximum of ' +
                `${VALID_MAX_DESC_LENGTH} characters.` +
                `And you typed ${title.length}.`,
        });
    const taskExists = yield Tasks_service_1.default.taskExists(description, userId);
    if (taskExists)
        return res.status(400)
            .json({
            message: 'Already exists an task registered with this' +
                ` description: ${description}`
        });
    next();
});
exports.default = validateTask;
