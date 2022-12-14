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
const Login_service_1 = __importDefault(require("../services/Login.service"));
const jwtGenerator_1 = __importDefault(require("../helpers/jwtGenerator"));
class LoginController {
    constructor() {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = { email, password };
                const userData = yield this.service.login(user);
                if (!userData) {
                    return res.status(400).json({ message: 'Unable to login.' });
                }
                return res.status(200).json(userData);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.userAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                if (!authorization) {
                    return res.status(401).json({ message: 'Token não encontrado.' });
                }
                const decoded = yield jwtGenerator_1.default.verify(authorization);
                return res.status(200).json(decoded);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Login_service_1.default();
    }
}
exports.default = new LoginController();
