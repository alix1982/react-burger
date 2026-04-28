import { apiRequest } from './api';

// авторизация - authSlice
// регистрация
export const postRegister = async (data) => {
  const result = await apiRequest.post('/auth/register', data);
  return result;
};
// вход
export const postLogin = async (data) => {
  const result = await apiRequest.post('/auth/login', data);
  return result;
};
// изменение пароля
export const postChangePassword = async (data) => {
  const result = await apiRequest.post('/password-reset', data);
  return result;
};
// сброс пароля
export const postResetPassword = async (data) => {
  const newData = {
    password: data.password,
    token: data.name,
  };
  const result = await apiRequest.post('/password-reset/reset', newData);
  return result;
};
// выход пользователя
export const postLogout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const result = await apiRequest.post('/auth/logout', { token: refreshToken });
  return result;
};

// пользователь userSlice
// получение данных пользователя
export const getUser = async () => {
  const result = await apiRequest.get('/auth/user');
  return result;
};
// изменение данных пользователя
export const patchUser = async (data) => {
  const result = await apiRequest.patch('/auth/user', data);
  return result;
};

// ингридиенты ingriedientsSlice
// получение ингридиентов
export const getIngriedients = async () => {
  const result = await apiRequest.get('/ingredients');
  return result;
};

// заказ orderSlice
// отправка данных заказа
export const postOrder = async (data) => {
  const ingridientsId = [];
  data.forEach((ingriedient) => {
    ingridientsId.push(ingriedient._id);
  });
  const ingriedientsOrder = {
    ingredients: [...ingridientsId, ingridientsId[0]],
  };
  const result = await apiRequest.post('/orders', ingriedientsOrder);
  return result;
};
