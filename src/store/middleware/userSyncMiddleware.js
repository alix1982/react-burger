import { setUser } from '../userSlice/userSlice';

export const userSyncMiddleware = (store) => (next) => (action) => {
  // Пропускаем действие дальше по цепочке
  const result = next(action);
  // console.log(action);
  // Проверяем, является ли действие успешным результатом авторизации
  if (
    (action.type === 'auth/register/fulfilled' ||
      action.type === 'auth/login/fulfilled') &&
    action.payload?.user
  ) {
    // Синхронизируем данные — отправляем user в userSlice
    store.dispatch(setUser(action.payload.user));
  }

  return result;
};
