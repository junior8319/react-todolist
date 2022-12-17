import { requestPost } from '../api/requests';
import { IRegistering } from '../interfaces/IUser';

const RegisterUserHelper = async (user: IRegistering) => {
  try {
    const response = await requestPost(
      '/users',
      '',
      {
        name: user.name,
        email: user.email,
        password: user.password,
        telephone: user.telephone,
      }
    );

    return response;
  } catch (error: any) {
    if (error.response.status && error.response.data.message) {
      const returnError = {
        status: error.response.status,
        message: error.response.data.message,
      };
      
      return returnError;
    }
    console.log(error);
    
    return error;
  }
};

export default RegisterUserHelper;
