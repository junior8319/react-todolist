"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const User_1 = __importDefault(require("./User"));
class TaskModel extends sequelize_1.Model {
}
TaskModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    underscored: true,
    timestamps: true,
    modelName: 'task',
    tableName: 'tasks',
});
User_1.default.hasMany(TaskModel, { foreignKey: 'userId', as: 'tasks' });
TaskModel.belongsTo(User_1.default, { foreignKey: 'userId', as: 'user' });
exports.default = TaskModel;
