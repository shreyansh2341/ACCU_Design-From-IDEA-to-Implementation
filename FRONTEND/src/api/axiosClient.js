import axios from 'axios';

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const axiosClient = axios.create({
  baseURL: `${REACT_APP_BACKEND_URL}/api`,
  withCredentials: true
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // change if you use another storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
