import { requestGet } from "../api/requests";

const GetUserHelper = async (token: string, id: number) => {
  try {
    const response = await requestGet(
      `/users/${id}`,
      token,
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

export default GetUserHelper;