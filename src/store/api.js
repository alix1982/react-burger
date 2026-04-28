import axios from 'axios';

import { REACT_APP_BASE_URL } from '@/utils/constant';
import { addTokenInStorage, clearTokenInStorage, getCookie } from '@/utils/helpers';
// const { REACT_APP_BASE_URL } = process.env;

// обновление токена
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  // console.log(refreshToken);
  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  try {
    const response = await apiRequest.post('/auth/token', { token: refreshToken });
    // const { accessToken, refreshToken } = response.data;
    // console.log(response);
    // Сохраняем новый access token (в cookie или localStorage)
    addTokenInStorage(response.data);
    // document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
    // localStorage.setItem('refreshToken', refreshToken);
    return response.data.accessToken;
  } catch (error) {
    // Очищаем токены при ошибке обновления
    // console.log('api');
    // console.log(error);
    clearTokenInStorage();
    // localStorage.removeItem('refreshToken');
    // document.cookie = 'accessToken=; path=/; secure; samesite=strict';
    throw error;
  }
};

export const apiRequest = axios.create({
  withCredentials: false,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: REACT_APP_BASE_URL,
});

apiRequest.interceptors.request.use((config) => {
  // console.log(document.cookie);
  const token = getCookie('accessToken');
  // const refreshToken = localStorage.getItem('token');
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = token;
  }
  return config;
});

let isRefreshing = false; // флаг выполнения обновления токена
let failedQueue = []; // массив запросов в очереди

// выполнение или отклонение запросов в очереди
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.data?.message === 'jwt expired') {
      if (isRefreshing) {
        // Если уже идёт обновление токена, ставим запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiRequest(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return apiRequest(originalRequest); // Повторяем оригинальный запрос
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Для других ошибок — просто передаём дальше
    const serverError = error.response?.data || {
      message: 'Произошла ошибка при выполнении запроса',
      statusCode: error.response?.status,
    };
    return Promise.reject(serverError);
  }
);
