import ITask from "./ITask";

export default interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  telephone?: number;
  tasks?: ITask[] | [];
}

export interface IRegistering {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  telephone?: number | null;
}