import { ILoginUser } from "../../../backend/src/interfaces/ILogin";
import { requestPost } from "../api/requests";

const LoginHelper = async (user: ILoginUser) => {
  try {
    const response = await requestPost(
      '/login',
      '',
      {
        email: user.email,
        password: user.password,
      },
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

export default LoginHelper;
