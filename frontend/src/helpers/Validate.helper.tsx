import { requestPost } from "../api/requests";

const ValidateHelper = async (token: string) => {
  try {
    const response = await requestPost(
      '/validate',
      token,
      {},
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

export default ValidateHelper;