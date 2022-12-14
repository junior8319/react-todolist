import md5 from 'md5';
import TaskModel from '../database/models/Task';
import UserModel from '../database/models/User';
import ITask from '../interfaces/ITask';


class TasksService {
  static model: ITask;

  public id!: number;

  public title!: string;

  public description!: string;

  public status!: string;

  public userId!: number;

  constructor() {
    TasksService.model = new TaskModel();
  }

  public getTasks = async (): Promise<ITask[] | null> => {
    const tasksList = await TaskModel.findAll({
      include: { model: UserModel, as: 'user', attributes: { exclude: ['password'] } },
    });
    if (!tasksList) return null;

    return tasksList;
  };
  
  public getTaskById = async (receivedId: number): Promise<ITask | null> => {
    if (!receivedId) return null;
    this.id = receivedId;

    const task = await TaskModel.findOne(
      {
        where: { id: this.id },
        include: [
          { model: UserModel, as: 'user', attributes: { exclude: ['id', 'password'] } },
        ],
      }
    );
    if (!task) return null;

    return task.dataValues;
  };

  public getTaskByTitle = async (receivedTitle: string): Promise<ITask | null> => {
    if (!receivedTitle) return null;
    this.title = receivedTitle;

    const task = await TaskModel.findOne(
      {
        where: { title: this.title },
        include: [
          { model: UserModel, as: 'user', attributes: { exclude: ['id', 'password'] } },
        ],
      }
    );
    if (!task) return null;

    return task.dataValues;
  };

  static taskExists = async (receivedDescription: string, receivedUserId: number): Promise<boolean> => {
    const task = await TaskModel.findOne({
      where: { description: receivedDescription },
    });

    const exists = !!task;

    return exists;
  };

  public createTask = async (receivedTask: ITask): Promise<ITask | null> => {
    if (!receivedTask) return null;

    this.description = receivedTask.description;
    this.userId = receivedTask.userId;
    const taskExists = await TasksService.taskExists(this.description, this.userId);
    if (taskExists) return null;

    const newTask = await TaskModel.create({ ...receivedTask });
    if (!newTask) return null;

    return newTask.dataValues;
  };

  public updateTask = async (receivedTask: ITask): Promise<ITask | null> => {
    if (!receivedTask || !receivedTask.id) return null;

    this.id = receivedTask.id;

    const taskToUpdate = await TaskModel.findByPk(this.id);
    if (!taskToUpdate) return null;

    if (receivedTask.title) {
      this.title = receivedTask.title;

      await taskToUpdate.update({ title: receivedTask.title });
    }

    if (receivedTask.description && receivedTask.userId) {
      this.description = receivedTask.description;
      this.userId = receivedTask.userId;

      const alreadyExists = await TasksService.taskExists(
        this.description,
        this.userId
      ); // To update the task description, this verification is needed.
      if (alreadyExists) return null;

      await taskToUpdate.update({ email: this.description });
    }

    if (receivedTask.status) {
      await taskToUpdate.update({ password: md5(receivedTask.status) });
    }

    return taskToUpdate;
  };

  public deleteTask = async (receivedId: number): Promise<ITask | null> => {
    if (!receivedId) return null;

    this.id = receivedId;

    const taskToDelete = await TaskModel.findByPk(this.id);
    if (!taskToDelete) return null;

    await taskToDelete.destroy();

    return taskToDelete;
  };
}

export default TasksService;
