import { apiRequest } from './api';

import type { AxiosResponse } from 'axios';

import type {
  FetchAuthChangeReturn,
  FetchAuthReturn,
  FetchIngriedientsReturn,
  FetchLoginArg,
  FetchOrderArg,
  FetchOrderReturn,
  FetchPasswordChangeArg,
  FetchPasswordResetArg,
  FetchRegisterArg,
  FetchUserArg,
  FetchUserReturn,
} from './types';

// авторизация - authSlice
// регистрация
export const postRegister = async (
  data: FetchRegisterArg
): Promise<AxiosResponse<FetchAuthReturn>> => {
  const result = await apiRequest.post('/auth/register', data);
  return result;
};
// вход
export const postLogin = async (
  data: FetchLoginArg
): Promise<AxiosResponse<FetchAuthReturn>> => {
  const result = await apiRequest.post('/auth/login', data);
  return result;
};
// изменение пароля
export const postChangePassword = async (
  data: FetchPasswordChangeArg
): Promise<AxiosResponse<FetchAuthChangeReturn>> => {
  const result = await apiRequest.post('/password-reset', data);
  return result;
};
// сброс пароля
export const postResetPassword = async (
  data: FetchPasswordResetArg
): Promise<AxiosResponse<FetchAuthChangeReturn>> => {
  const newData = {
    password: data.password,
    token: data.token,
  };
  const result = await apiRequest.post('/password-reset/reset', newData);
  return result;
};
// выход пользователя
export const postLogout = async (): Promise<AxiosResponse<FetchAuthChangeReturn>> => {
  const refreshToken = localStorage.getItem('refreshToken');
  const result = await apiRequest.post('/auth/logout', { token: refreshToken });
  return result;
};

// пользователь userSlice
// получение данных пользователя
export const getUser = async (): Promise<AxiosResponse<FetchUserReturn>> => {
  const result = await apiRequest.get('/auth/user');
  return result;
};
// изменение данных пользователя
export const patchUser = async (
  data: FetchUserArg
): Promise<AxiosResponse<FetchUserReturn>> => {
  const result = await apiRequest.patch('/auth/user', data);
  return result;
};

// ингридиенты ingriedientsSlice
// получение ингридиентов
export const getIngriedients = async (): Promise<
  AxiosResponse<FetchIngriedientsReturn>
> => {
  const result = await apiRequest.get('/ingredients');
  return result;
};

// заказ orderSlice
// отправка данных заказа
export const postOrder = async (
  data: FetchOrderArg
): Promise<AxiosResponse<FetchOrderReturn>> => {
  const ingridientsId: string[] = [];
  data.forEach((ingriedient) => {
    if (ingriedient.type !== 'bunDefault' && ingriedient.type !== 'ingriedientDefault') {
      ingridientsId.push(ingriedient._id);
    }
  });
  const ingriedientsOrder = {
    ingredients: [...ingridientsId, ingridientsId[0]],
  };
  const result = await apiRequest.post('/orders', ingriedientsOrder);
  return result;
};
