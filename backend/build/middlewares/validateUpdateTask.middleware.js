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
Object.defineProperty(exports, "__esModule", { value: true });
const validateUpdateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = req.body;
    const { title, description, userId } = task;
    const keysInSearch = ['title', 'description', 'status', 'userId'];
    const foundKeys = Object.keys(task);
    const found = keysInSearch.some(key => foundKeys.includes(key));
    console.log(found);
    const VALID_MIN_DESC_LENGTH = 5;
    const VALID_MAX_DESC_LENGTH = 100;
    const VALID_MAX_TIT_LENGTH = 20;
    if (!task || !foundKeys || foundKeys.length === 0 || !found) {
        return res.status(400).json({
            message: 'Nothing to update.'
        });
    }
    if (description && description.length < VALID_MIN_DESC_LENGTH)
        return res.status(400)
            .json({
            message: 'Description\'s length must be at least ' +
                `${VALID_MIN_DESC_LENGTH} characters long. ` +
                `And you typed ${description.length}.`,
        });
    if (description && description.length > VALID_MAX_DESC_LENGTH)
        return res.status(400)
            .json({
            message: 'Description\'s length must be a maximum of ' +
                `${VALID_MAX_DESC_LENGTH} characters.` +
                `And you typed ${description.length}.`,
        });
    if (title && title.length > VALID_MAX_TIT_LENGTH)
        return res.status(400)
            .json({
            message: 'Title\'s length must be a maximum of ' +
                `${VALID_MAX_DESC_LENGTH} characters.` +
                `And you typed ${title.length}.`,
        });
    // const taskExists = await TasksService.taskExists(description, userId);
    // if (taskExists) return res.status(400)
    //   .json({
    //     message:
    //       'Already exists an task registered with this' +
    //       ` description: ${description}`
    //   });
    next();
});
exports.default = validateUpdateTask;
