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
const jwtGenerator_1 = __importDefault(require("../helpers/jwtGenerator"));
class UsersController {
    constructor() {
        this.jwt = jwtGenerator_1.default;
        this.getUsers = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usersList = yield this.service.getUsers();
                if (!usersList)
                    return res.status(404)
                        .json({ message: 'Can\'t find users in our database.' });
                return res.status(200).json(usersList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                const user = yield this.service.getUserById(this.id);
                if (!user)
                    return res.status(400)
                        .json({ message: 'Can\'t find users in our database.' });
                return res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getUserByName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                this.name = name;
                if (!this.name)
                    return null;
                const user = yield this.service.getUserByName(this.name);
                if (!user)
                    return res.status(404)
                        .json({ message: 'User name not found.' });
                return res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.user = req.body;
                const newUser = yield this.service.createUser(this.user);
                if (!newUser)
                    return res.status(400).json({
                        message: `Can\'t rgister this person.`,
                    });
                const token = yield jwtGenerator_1.default.generate(newUser);
                if (!token)
                    return res.status(400)
                        .json({ message: 'Unable to generate a token for this person.' });
                return res.status(201).json({ user: newUser, token });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'No data to update.' });
                const user = Object.assign(Object.assign({}, req.body), { id });
                const updatedUser = yield this.service.updateUser(user);
                if (!updatedUser)
                    return res.status(403)
                        .json({
                        message: 'Could not register, probably already exists' +
                            ' a user with this email address in our database.'
                    });
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Please give us an id to exclude.',
                    });
                this.id = Number(id);
                const userDeleted = yield this.service.deleteUser(this.id);
                if (!userDeleted)
                    return res.status(404)
                        .json({ message: `Unable to find a task with the id ${id}` });
                return res.status(202).json({ message: 'Record deleted successfully.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Users_service_1.default();
    }
}
exports.default = new UsersController();
