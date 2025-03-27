import axios from 'axios';
import { useAuth } from '../hooks';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem('token');

const apis = {
  get: async (pathUrl) => {
    if (token) {
      const response = await axios.get(`${SERVER_URL}${pathUrl}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } else {
      const response = await axios.get(`${SERVER_URL}${pathUrl}`);
      return response;
    }
  },

  post: async (pathUrl, body) => {
    if (token) {
      const response = await axios.post(`${SERVER_URL}${pathUrl}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } else {
      const response = await axios.post(`${SERVER_URL}${pathUrl}`, body);
      return response;
    }
  },

  put: async (pathUrl, body) => {
    if (token) {
      const response = await axios.put(`${SERVER_URL}${pathUrl}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } else {
      const response = await axios.put(`${SERVER_URL}${pathUrl}`, body);
      return response;
    }
  },

  del: async (pathUrl) => {
    if (token) {
      const response = await axios.delete(`${SERVER_URL}${pathUrl}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } else {
      const response = await axios.delete(`${SERVER_URL}${pathUrl}`);
      return response;
    }
  },
};

export default apis;
