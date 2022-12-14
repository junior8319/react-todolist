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
const Users_service_1 = __importDefault(require("../services/Users.service"));
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const VALID_USERNAME_LENGTH = 3;
    const VALID_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w{2,3}([-.]\w{2,3})*$/;
    const VALID_PASSWORD = (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{8,}/g);
    if (!user.email || !user.password || !user.name) {
        return res.status(400).json({
            message: 'Enter email, name and password to register.'
        });
    }
    const isValidUserName = user.name.length >= VALID_USERNAME_LENGTH;
    const isValidPassword = VALID_PASSWORD.test(user.password);
    const isValidEmail = VALID_EMAIL.test(user.email);
    if (!isValidUserName) {
        return res.status(401).json({
            message: 'Name must have at least 3 characters length.',
        });
    }
    if (!isValidEmail) {
        return res.status(401).json({
            message: 'Please inform a valid email address.'
        });
    }
    if (!isValidPassword) {
        return res.status(401).json({
            message: 'Password must have at least 8 characters,' +
                ' 1 uppercase letter and 1 number',
        });
    }
    const userExists = yield Users_service_1.default.userExists(user.email);
    if (userExists)
        return res.status(400)
            .json({ message: `Already exists an user registered with this email: ${user.email}` });
    next();
});
exports.default = validateUser;
