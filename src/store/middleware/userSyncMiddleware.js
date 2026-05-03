import { setUser } from '../userSlice/userSlice';

export const userSyncMiddleware = (store) => (next) => (action) => {
  // Пропускаем действие дальше по цепочке
  const result = next(action);

  // Проверяем, является ли действие успешным результатом авторизации
  if (
    (action.type === 'auth/register/fulfilled' ||
      action.type === 'auth/login/fulfilled') &&
    action.payload?.user
  ) {
    // Синхронизируем данные — отправляем user в userSlice
    store.dispatch(setUser({ ...action.payload.user, password: '' }));
  }

  // Обработка успешного выхода из системы
  if (action.type === 'auth/logout/fulfilled') {
    // Очищаем данные пользователя в userSlice при успешном выходе
    store.dispatch(setUser(null));
  }

  return result;
};
