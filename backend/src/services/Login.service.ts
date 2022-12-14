import UsersService from './Users.service';
import { ILogin, ILoginUser } from '../interfaces/ILogin';
import jwtGenerator from '../helpers/jwtGenerator';
import md5 from 'md5';
import UserModel from '../database/models/User';

class LoginService {
  static service: UsersService;

  constructor() {
    LoginService.service = new UsersService();
  }

  public generateToken = async (user: ILoginUser): Promise<ILogin | null> => {
    if (!user || !user.id) return null;
    
    const userData = await LoginService.service.getUserById(user.id);
    if (!userData) return null;

    const token = await jwtGenerator.generate({
      id: user.id,
      email: user.email,
    });

    if (!token) return null;

    return { user: userData, token };
  };

  public login = async (user: ILoginUser): Promise<ILogin | null> => {
    if (!user || !user.password || !user.email) return null;
    const hashedPassword = md5(user.password);

    const userData = await UserModel.findOne({
      where: {
        email: user.email,
        password: hashedPassword,
      },
      attributes: { exclude: ['password'] },
    });

    if (!userData) return null;

    delete userData.dataValues.password;

    const userLoggedData = await this.generateToken(userData.dataValues);
    if (!userLoggedData) return null;

    return userLoggedData;
  };
}

export default LoginService;
