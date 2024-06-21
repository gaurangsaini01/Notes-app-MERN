import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://notes-app-mern-9d8p.onrender.com/api/v1',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
