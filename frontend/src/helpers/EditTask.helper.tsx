import { requestPut } from '../api/requests';
import ITask from '../interfaces/ITask';

const EditTaskHelper = async (task: ITask, token: string | undefined) => {
  try {
    const response = await requestPut(
      `tasks/${task.id}`,
      (token) ? token: '',
      {
        title: (task.title) ? task.title : null,
        description: (task.description) ? task.description : null,
        status: (task.status) ? task.status : null,
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

export default EditTaskHelper;
