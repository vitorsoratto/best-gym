import axios from 'axios';
import { getStringToken } from '../utils/util';

const baseURL = 'http://localhost:8000';

const handleUnauthorized = async (error) => {
  if (error.response?.status === 401) {
    console.log('Unauthorized');
    sessionStorage.removeItem('token');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = '/';
  } else {
    throw error;
  }
}

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
    handleUnauthorized(error);
  }
};

export const getUserProfile = async () => {

  try {
    const response = await api.get('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${getStringToken()}`,
      },
    });
    return response;
  } catch (error) {
    handleUnauthorized(error);
  }
};

export const getGymList = async () => {
  try {
    const response = await api.get('/api/gym', {
      headers: {
        Authorization: `Bearer ${getStringToken()}`,
      },
    });
    return response;
  } catch (error) {
    handleUnauthorized(error);
  }
};

export const saveGym = async (gym) => {
  try {
    const response = await api.post('/api/gym', gym, {
      headers: {
        Authorization: `Bearer ${getStringToken()}`,
      },
    });
    return response;
  } catch (error) {
    handleUnauthorized(error);
  }
};

export const editGym = async (gym) => {
  try {
    const response = await api.put(`/api/gym/${gym.id}`, gym, {
      headers: {
        Authorization: `Bearer ${getStringToken()}`,
      },
    });
    return response;
  } catch (error) {
    handleUnauthorized(error);
  }
}

export const deleteGym = async (gymId) => {
  try {
    const response = await api.delete(`/api/gym/${gymId}`, {
      headers: {
        Authorization: `Bearer ${getStringToken()}`,
      },
    });
    return response;
  } catch (error) {
    handleUnauthorized(error);
  }
}
