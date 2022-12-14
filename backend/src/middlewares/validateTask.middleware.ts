import { NextFunction, Request, Response } from 'express';
import ITask from '../interfaces/ITask';
import TasksService from '../services/Tasks.service';
import { Status } from '../enums/Task';

const validateTask = async (req: Request, res: Response, next: NextFunction) => {
  const task: ITask = req.body;
  const { title, description, status, userId } = task;  

  const VALID_MIN_DESC_LENGTH = 5;
  const VALID_MAX_DESC_LENGTH = 100;
  const VALID_MAX_TIT_LENGTH = 20;

  if (
    !title ||
    !description ||
    !status ||
    !userId ||
    title.length === 0 ||
    description.length === 0 ||
    status.length === 0
  ) {
    return res.status(400).json({
      message: 'The fields title, description, status and userId are ' +
        'required to register a new task.',
    });
  }

  if (description.length < VALID_MIN_DESC_LENGTH) return res.status(400)
    .json({
      message: 'Description\'s length must be at least ' +
        `${VALID_MIN_DESC_LENGTH} characters long. ` +
        `And you typed ${description.length}.`,
    });

  if (description.length > VALID_MAX_DESC_LENGTH) return res.status(400)
    .json({
      message: 'Description\'s length must be a maximum of ' +
        `${VALID_MAX_DESC_LENGTH} characters.` +
        `And you typed ${description.length}.`,
    });

  if (title.length > VALID_MAX_TIT_LENGTH) return res.status(400)
    .json({
      message: 'Title\'s length must be a maximum of ' +
        `${VALID_MAX_DESC_LENGTH} characters.` +
        `And you typed ${title.length}.`,
    });

  const taskExists = await TasksService.taskExists(description, userId);
  
  if (taskExists) return res.status(400)
    .json({
      message:
        'Already exists an task registered with this' +
        ` description: ${description}`
    });

  next();
};

export default validateTask;
