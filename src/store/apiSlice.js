import { apiRequest } from './api';

// получение ингридиентов
export const getIngriedients = async () => {
  const result = await apiRequest.get('/ingredients');
  return result;
};

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
