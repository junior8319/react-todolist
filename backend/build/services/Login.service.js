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
const Users_service_1 = __importDefault(require("./Users.service"));
const jwtGenerator_1 = __importDefault(require("../helpers/jwtGenerator"));
const md5_1 = __importDefault(require("md5"));
const User_1 = __importDefault(require("../database/models/User"));
class LoginService {
    constructor() {
        this.generateToken = (user) => __awaiter(this, void 0, void 0, function* () {
            if (!user || !user.id)
                return null;
            const userData = yield LoginService.service.getUserById(user.id);
            if (!userData)
                return null;
            const token = yield jwtGenerator_1.default.generate({
                id: user.id,
                email: user.email,
            });
            if (!token)
                return null;
            return { user: userData, token };
        });
        this.login = (user) => __awaiter(this, void 0, void 0, function* () {
            if (!user || !user.password || !user.email)
                return null;
            const hashedPassword = (0, md5_1.default)(user.password);
            const userData = yield User_1.default.findOne({
                where: {
                    email: user.email,
                    password: hashedPassword,
                },
                attributes: { exclude: ['password'] },
            });
            if (!userData)
                return null;
            delete userData.dataValues.password;
            const userLoggedData = yield this.generateToken(userData.dataValues);
            if (!userLoggedData)
                return null;
            return userLoggedData;
        });
        LoginService.service = new Users_service_1.default();
    }
}
exports.default = LoginService;
