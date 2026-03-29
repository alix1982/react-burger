import { apiRequest } from './api';

// получение ингридиентов
export const getIngriedients = async () => {
  const result = await apiRequest.get('/ingredients');
  return result;
};
