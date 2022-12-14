import { Model, DataTypes } from 'sequelize';
import db from '.';
import UserModel from './User';

class TaskModel extends Model {
  public id!: number;

  public title!: string;

  public description!: string;

  public status!: string;

  public userId!: number;
}

TaskModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    description: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    
    status: {
      type: DataTypes.STRING,
      allowNull: false,  
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: true,
    modelName: 'task',
    tableName: 'tasks',
  },
);

UserModel.hasMany(TaskModel, { foreignKey: 'userId', as: 'tasks' });
TaskModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

export default TaskModel;
