import { NextFunction, Request, Response } from 'express';
import jwtGenerator from '../helpers/jwtGenerator';
import ITask from '../interfaces/ITask';
import TasksService from '../services/Tasks.service';

class TasksController {
  public service: TasksService;

  public jwt = jwtGenerator;

  public task!: ITask;

  public id!: number;

  public title!: string;

  constructor() {
    this.service = new TasksService();
  }

  public getTasks = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tasksList: ITask[] | null = await this.service.getTasks();
      
      if (!tasksList) return res.status(404)
        .json({ message: 'Can\'t find tasks in our database.' });

      return res.status(200).json(tasksList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getTaskById = async (req: Request, res: Response, next: NextFunction) => {
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

      const task: ITask | null = await this.service.getTaskById(this.id);
      
      if (!task) return res.status(400)
        .json({ message: 'Can\'t find this task.' });

      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getTaskByTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { title } = req.query;
      
      if (!title) return res.status(400)
      .json({ message: 'Not query parameter title to search.' })
      
      this.title = title?.toString();

      if (!this.title) return null;

      const task: ITask | null = await this.service.getTaskByTitle(this.title);
      
      if (!task) return res.status(404)
        .json({ message: 'Task not found.' });

      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.task = req.body;

      const newTask: ITask | null = await this.service.createTask(this.task);
      if (!newTask) return res.status(400).json({
        message: `Can\'t rgister this task.`,
      });

      return res.status(201).json({ task: newTask });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'No data to update.' });
      
      const task = { ...req.body, id };
      
      const updatedTask = await this.service.updateTask(task);
      if (!updatedTask) return res.status(403)
        .json({
          message: 'Could not register, probably ' +
            'already exists a task with this description.'
        });

      return res.status(200).json(updatedTask);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Please give us an id to exclude.',
        });
      
      this.id = Number(id);
      const taskDeleted = await this.service.deleteTask(this.id);
      if(!taskDeleted) return res.status(404)
        .json({ message: `Unable to find a task with the id ${id}` });

      return res.status(202).json({ message: 'Record successfully deleted.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new TasksController();
