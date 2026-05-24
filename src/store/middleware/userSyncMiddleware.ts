// версия TS Алисы
import { setUser } from '../userSlice/userSlice';

import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import type { AppDispatch } from '..';
import type {
  AuthState,
  ConstructorState,
  FetchAuthChangeReturn,
  FetchAuthReturn,
  FetchUserReturn,
  IngridientsState,
  ModalState,
  OrderState,
  UserState,
} from '../types';

type RootState = {
  user: UserState;
  ingridient: IngridientsState;
  constructorIngriedients: ConstructorState;
  modal: ModalState;
  order: OrderState;
  auth: AuthState;
};

type AuthPayload = FetchAuthReturn | FetchUserReturn;
type AuthLogoutPayload = FetchAuthChangeReturn | FetchUserReturn;

// Улучшенная защита типа — более надёжная проверка наличия user
const hasUserProperty = (payload: AuthPayload): payload is FetchAuthReturn => {
  return (
    payload &&
    typeof payload === 'object' &&
    'user' in payload &&
    payload.user !== undefined &&
    payload.user !== null
  );
};

// Единый тип для всех релевантных действий
type RelevantAuthAction =
  | { type: 'auth/register/fulfilled'; payload: AuthPayload }
  | { type: 'auth/login/fulfilled'; payload: AuthPayload }
  | { type: 'auth/logout/fulfilled'; payload?: AuthLogoutPayload };

const isRelevantAuthAction = (action: unknown): action is RelevantAuthAction => {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    (action.type === 'auth/register/fulfilled' ||
      action.type === 'auth/login/fulfilled' ||
      action.type === 'auth/logout/fulfilled')
  );
};

// export const userSyncMiddleware: Middleware<unknown, RootState> =
//   (store) => (next) => (action: unknown) => {
export const userSyncMiddleware: Middleware =
  (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    const result = next(action);

    if (isRelevantAuthAction(action)) {
      console.log('Middleware processing action:', action.type);

      switch (action.type) {
        case 'auth/register/fulfilled':
        case 'auth/login/fulfilled':
          if ('payload' in action && action.payload && hasUserProperty(action.payload)) {
            console.log('Authorization successful, syncing user:', action.payload.user);
            store.dispatch(setUser({ ...action.payload.user, password: '' }));
          } else {
            console.warn('Authorization action received but no user data in payload');
          }
          break;

        case 'auth/logout/fulfilled':
          console.log('Logout detected, clearing user data');
          store.dispatch(setUser(null));
          break;
      }
    }

    return result;
  };

// варинт JS
// import { setUser } from '../userSlice/userSlice';

// export const userSyncMiddleware = (store) => (next) => (action) => {
//   // Пропускаем действие дальше по цепочке
//   const result = next(action);

//   // Проверяем, является ли действие успешным результатом авторизации
//   if (
//     (action.type === 'auth/register/fulfilled' ||
//       action.type === 'auth/login/fulfilled') &&
//     action.payload?.user
//   ) {
//     console.log(action.payload);
//     // Синхронизируем данные — отправляем user в userSlice
//     store.dispatch(setUser({ ...action.payload.user, password: '' }));
//   }

//   // Обработка успешного выхода из системы
//   if (action.type === 'auth/logout/fulfilled') {
//     // Очищаем данные пользователя в userSlice при успешном выходе
//     store.dispatch(setUser(null));
//   }

//   return result;
// };
