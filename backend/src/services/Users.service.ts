import md5 from 'md5';
import TaskModel from '../database/models/Task';
import UserModel from '../database/models/User';
import IUser from "../interfaces/IUser";


class UsersService {
  static model: IUser;

  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public telephone!: number;

  constructor() {
    UsersService.model = new UserModel();
  }

  public getUsers = async (): Promise<IUser[] | null> => {
    const usersList = await UserModel.findAll(
      {
        include: { model: TaskModel, as: 'tasks' },
        attributes: { exclude: ['password'] },
      }
    );
    if (!usersList) return null;

    return usersList;
  };
  
  public getUserById = async (receivedId: number): Promise<IUser | null> => {
    if (!receivedId) return null;
    this.id = receivedId;

    const user = await UserModel.findOne(
      {
        where: { id: this.id },
        include: [
          { model: TaskModel, as: 'tasks', attributes: { exclude: ['id'] } },
        ],
        attributes: { exclude: ['password'] },
      }
    );
    if (!user) return null;

    return user.dataValues;
  };

  public getUserByName = async (receivedName: string): Promise<IUser | null> => {
    if (!receivedName) return null;
    this.name = receivedName;

    const user = await UserModel.findOne(
      {
        where: { name: this.name },
        include: [
          { model: TaskModel, as: 'tasks' },
        ],
        attributes: { exclude: ['password'] },
      }
    );
    if (!user) return null;

    return user.dataValues;
  };

  static userExists = async (receivedEmail: string): Promise<boolean> => {
    const user = await UserModel.findOne({
      where: { email: receivedEmail },
    });

    const exists = !!user;

    return exists;
  };

  public createUser = async (receivedUser: IUser): Promise<IUser | null> => {
    if (!receivedUser) return null;

    this.email = receivedUser.email;
    this.password = md5(receivedUser.password);
    const userExists = await UsersService.userExists(this.email);
    if (userExists) return null;

    const newUser = await UserModel.create({ ...receivedUser, password: this.password });
    if (!newUser) return null;
    
    delete newUser.dataValues.password;

    return newUser.dataValues;
  };

  public updateUser = async (receivedUser: IUser): Promise<IUser | null> => {
    if (!receivedUser || !receivedUser.id) return null;

    this.id = receivedUser.id;

    const userToUpdate = await UserModel.findByPk(this.id);
    if (!userToUpdate) return null;

    if (receivedUser.name) {
      this.name = receivedUser.name;

      await userToUpdate.update({ name: receivedUser.name });
    }

    if (receivedUser.email) {
      this.email = receivedUser.email;

      const alreadyExists = await UsersService.userExists(this.email);
      if (alreadyExists) return null;

      await userToUpdate.update({ email: this.email });
    }

    if (receivedUser.password) {
      await userToUpdate.update({ password: md5(receivedUser.password) });
    }

    if (receivedUser.telephone) {
      await userToUpdate.update({ telephone: receivedUser.telephone });
    }

    return userToUpdate;
  };

  public deleteUser = async (receivedId: number): Promise<IUser | null> => {
    if (!receivedId) return null;

    this.id = receivedId;

    const userToDelete = await UserModel.findByPk(this.id);
    if (!userToDelete) return null;

    await userToDelete.destroy();

    return userToDelete;
  };
}

export default UsersService;
