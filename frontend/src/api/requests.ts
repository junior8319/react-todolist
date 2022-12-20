import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST;
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL;

const api = axios.create({
  baseURL:
  `${PROTOCOL}://${HOST}` ||
  process.env.REACT_APP_BASE_URL ||
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

export const requestPut = async (endpoint: string, token: string, body: {}) => {
  if (token) {
    const { data } = await api.put(
      endpoint,
      body,
      {
        headers: {
          'Authorization': token,
        }
      }
    );

    return data;
  }
  
  const { data } = await api.put(endpoint, body);

  return data;
};

export const requestDelete = async (endpoint: string, token: string) => {
  if (token) {
    const { data } = await api.delete(
      endpoint,
      {
        headers: {
          'Authorization': token,
        },
      },
    );

    return data;
  }

  const { data } = await api.delete(endpoint);
  return data;
};