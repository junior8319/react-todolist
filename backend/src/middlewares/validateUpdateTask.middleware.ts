import { NextFunction, Request, Response } from 'express';
import ITask from '../interfaces/ITask';
import TasksService from '../services/Tasks.service';

const validateUpdateTask = async (req: Request, res: Response, next: NextFunction) => {
  const task: ITask = req.body;
  const { title, description, userId } = task;
  const keysInSearch = ['title', 'description', 'status', 'userId'];
  const foundKeys = Object.keys(task);
  const found = keysInSearch.some(key => foundKeys.includes(key));

  const VALID_MIN_DESC_LENGTH = 5;
  const VALID_MAX_DESC_LENGTH = 100;
  const VALID_MAX_TIT_LENGTH = 20;

  if (!task || !foundKeys || foundKeys.length === 0 || !found) {
    return res.status(400).json({
      message: 'Nothing to update.'
    });
  }

  if (description && description.length < VALID_MIN_DESC_LENGTH) return res.status(400)
    .json({
      message: 'Description\'s length must be at least ' +
        `${VALID_MIN_DESC_LENGTH} characters long. ` +
        `And you typed ${description.length}.`,
    });

  if (description && description.length > VALID_MAX_DESC_LENGTH) return res.status(400)
    .json({
      message: 'Description\'s length must be a maximum of ' +
        `${VALID_MAX_DESC_LENGTH} characters.` +
        `And you typed ${description.length}.`,
    });

  if (title && title.length > VALID_MAX_TIT_LENGTH) return res.status(400)
    .json({
      message: 'Title\'s length must be a maximum of ' +
        `${VALID_MAX_DESC_LENGTH} characters.` +
        `And you typed ${title.length}.`,
    });

  next();
};

export default validateUpdateTask;
