export interface ILogin {
  token?: string;
  user: ILoginUser;
}

export interface ILoginUser {
  id?: number;
  email: string;
  password?: string;
}
