import axios from 'axios';

import { REACT_APP_BASE_URL } from '@/utils/constant';
// const { REACT_APP_BASE_URL } = process.env;

export const apiRequest = axios.create({
  withCredentials: false,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: REACT_APP_BASE_URL,
});

// apiRequest.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// apiRequest.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     return Promise.reject(error.response.data);
//   }
// );
