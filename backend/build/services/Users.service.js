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
class UsersService {
    constructor() {
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const usersList = yield User_1.default.findAll({
                include: { model: Task_1.default, as: 'tasks' },
                attributes: { exclude: ['password'] },
            });
            if (!usersList)
                return null;
            return usersList;
        });
        this.getUserById = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const user = yield User_1.default.findOne({
                where: { id: this.id },
                include: [
                    { model: Task_1.default, as: 'tasks' },
                ],
                attributes: { exclude: ['password'] },
            });
            if (!user)
                return null;
            return user.dataValues;
        });
        this.getUserByName = (receivedName) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedName)
                return null;
            this.name = receivedName;
            const user = yield User_1.default.findOne({
                where: { name: this.name },
                include: [
                    { model: Task_1.default, as: 'tasks' },
                ],
                attributes: { exclude: ['password'] },
            });
            if (!user)
                return null;
            return user.dataValues;
        });
        this.createUser = (receivedUser) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedUser)
                return null;
            this.email = receivedUser.email;
            this.password = (0, md5_1.default)(receivedUser.password);
            const userExists = yield UsersService.userExists(this.email);
            if (userExists)
                return null;
            const newUser = yield User_1.default.create(Object.assign(Object.assign({}, receivedUser), { password: this.password }));
            if (!newUser)
                return null;
            delete newUser.dataValues.password;
            return newUser.dataValues;
        });
        this.updateUser = (receivedUser) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedUser || !receivedUser.id)
                return null;
            this.id = receivedUser.id;
            const userToUpdate = yield User_1.default.findByPk(this.id);
            if (!userToUpdate)
                return null;
            if (receivedUser.name) {
                this.name = receivedUser.name;
                yield userToUpdate.update({ name: receivedUser.name });
            }
            if (receivedUser.email) {
                this.email = receivedUser.email;
                const alreadyExists = yield UsersService.userExists(this.email);
                if (alreadyExists)
                    return null;
                yield userToUpdate.update({ email: this.email });
            }
            if (receivedUser.password) {
                yield userToUpdate.update({ password: (0, md5_1.default)(receivedUser.password) });
            }
            if (receivedUser.telephone) {
                yield userToUpdate.update({ telephone: receivedUser.telephone });
            }
            return userToUpdate;
        });
        this.deleteUser = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const userToDelete = yield User_1.default.findByPk(this.id);
            if (!userToDelete)
                return null;
            yield userToDelete.destroy();
            return userToDelete;
        });
        UsersService.model = new User_1.default();
    }
}
_a = UsersService;
UsersService.userExists = (receivedEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        where: { email: receivedEmail },
    });
    const exists = !!user;
    return exists;
});
exports.default = UsersService;
