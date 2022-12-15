import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST;
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL;
const RAILWAY_BACK = process.env.REACT_APP_BASE_URL_RAILWAY;


const api = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL ||
    `${PROTOCOL}://${HOST}` ||
    `${PROTOCOL}://${RAILWAY_BACK}` ||
    'http://localhost:3000',
});

export const requestGet = async (endpoint: string, token: string) => {
  const { data } = await api.get(
    endpoint,
    {
      headers: {
        'authorization': token,
      },
    },
  );

  return data;
};

export const requestPost = async (endpoint: string, token: string, body: {}) => {
  if (token) {
    const { data } = await api.post(
      endpoint,
      body,
      {
        headers: {
          'Authorization': token,
        },
      },
    );

    return data;
  }

  const { data } = await api.post(endpoint, body);  

  return data;
};