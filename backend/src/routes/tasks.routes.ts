import { Router } from 'express';
import TasksController from '../controllers/Tasks.controller';
import errorMiddleware from '../middlewares/error.middleware';
import validateToken from '../middlewares/validateToken.middleware';
import validateTask from '../middlewares/validateTask.middleware';

const tasksRouter = Router();

tasksRouter.get(
  '/tasks',
  validateToken,
  TasksController.getTasks,
  errorMiddleware.handleErrors,
);

tasksRouter.get(
  '/tasks/:id',
  validateToken,
  TasksController.getTaskById,
);

tasksRouter.get(
  '/tasks',
  validateToken,
  TasksController.getTaskByTitle,
  errorMiddleware.handleErrors,
);

tasksRouter.post(
  '/tasks',
  validateToken,
  validateTask,
  TasksController.createTask,
  errorMiddleware.handleErrors,
);

tasksRouter.put(
  '/tasks/:id',
  validateToken,
  validateTask,
  TasksController.updateTask,
  errorMiddleware.handleErrors,
);

tasksRouter.delete(
  'tasks/:id',
  validateToken,
  TasksController.deleteTask,
  errorMiddleware.handleErrors,
);

export default tasksRouter;
