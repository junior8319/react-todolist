"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class ErrorMiddleware {
    constructor(error = new Error) {
        this.handleErrors = () => {
            this.app.use((error, _req, res, next) => {
                switch (this.name) {
                    case 'ValidationError':
                        return res.status(400).json({ message: this.message });
                    case 'NotFoundError':
                        return res.status(404).json({ message: this.message });
                    case 'ConflictError':
                        return res.status(409).json({ message: this.message });
                    default:
                        console.error(error);
                        res.sendStatus(500);
                }
                next();
            });
        };
        this.app = (0, express_1.default)();
        this.name = error.name;
        this.message = error.message;
        this.handleErrors();
    }
}
exports.default = new ErrorMiddleware();
