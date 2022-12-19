import { requestPost } from "../api/requests";
import ITask from "../interfaces/ITask";

const RegisterTaskHelper = async (task: ITask, token: string | undefined) => {
  try {
    const response = await requestPost(
      'tasks',
      (token) ? token : '',
      {
        title: task.title,
        description: task.description,
        status: task.status,
        userId: task.userId,
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

export default RegisterTaskHelper;
