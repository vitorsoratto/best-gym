import axios from 'axios';

const baseURL = 'http://localhost:8000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const login = async (userData) => {
  try {
    const response = await api.post('/api/user/login', {
      email: userData.email,
      password: userData.password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/api/user/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
