import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public telephone!: number;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    telephone: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: true,
    modelName: 'user',
    tableName: 'users',
  },
);

export default UserModel;
