import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import UsersService from '../services/Users.service';
import jwtGenerator from '../helpers/jwtGenerator';

class UsersController {
  public service: UsersService;

  public jwt = jwtGenerator;

  public user!: IUser;

  public id!: number;

  public name!: string;

  constructor() {
    this.service = new UsersService();
  }

  public getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const usersList: IUser[] | null = await this.service.getUsers();
      
      if (!usersList) return res.status(404)
        .json({ message: 'Can\'t find users in our database.' });

      return res.status(200).json(usersList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return null;

      const { authorization } = req.headers;

      if (!authorization) return res.status(401)
        .json({ message: 'Token not found.' });

      const token = await jwtGenerator.verify(authorization);
      if (!token) return res.status(400).json(
        { message: 'We can\'t find token data for this person.' }
      );

      this.id = Number(id);

      const user: IUser | null = await this.service.getUserById(this.id);
      
      if (!user) return res.status(400)
        .json({ message: 'Can\'t find users in our database.' });

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getUserByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      this.name = name;

      if (!this.name) return null;

      const user: IUser | null = await this.service.getUserByName(this.name);
      
      if (!user) return res.status(404)
        .json({ message: 'User name not found.' });

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.user = req.body;

      const newUser: IUser | null = await this.service.createUser(this.user);
      if (!newUser) return res.status(400).json({
        message: `Can\'t rgister this person.`,
      });

      const token = await jwtGenerator.generate(newUser);
      if (!token) return res.status(400)
        .json({ message: 'Unable to generate a token for this person.' });

      return res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'No data to update.' });
      
      const user = { ...req.body, id };
      
      const updatedUser = await this.service.updateUser(user);
      if (!updatedUser) return res.status(403)
        .json({
          message: 'Could not register, probably already exists' +
          ' a user with this email address in our database.'
        });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Please give us an id to exclude.',
        });
      
      this.id = Number(id);
      const userDeleted = await this.service.deleteUser(this.id);
      if(!userDeleted) return res.status(404)
        .json({ message: `Unable to find a task with the id ${id}` });

      return res.status(202).json({ message: 'Record deleted successfully.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new UsersController();
