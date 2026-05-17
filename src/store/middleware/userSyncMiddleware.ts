// версия TS Алисы
import { setUser } from '../userSlice/userSlice';

import type { Middleware } from '@reduxjs/toolkit';

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

export const userSyncMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => (action: unknown) => {
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

// вариант TS не мидлвара не работает - после авторизации сразу логаут
// import { setUser } from '../userSlice/userSlice';

// import type {
//   // Dispatch,
//   // EnhancedStore,
//   Middleware,
//   // Middleware,
//   // MiddlewareAPI,
//   // PayloadAction,
//   // StoreEnhancer,
//   // ThunkDispatch,
//   // Tuple,
//   // UnknownAction,
// } from '@reduxjs/toolkit';

// import type {
//   AuthState,
//   ConstructorState,
//   FetchAuthChangeReturn,
//   FetchAuthReturn,
//   FetchUserReturn,
//   IngridientsState,
//   ModalState,
//   OrderState,
//   UserState,
// } from '../types';
// // import type { RootState } from '..';

// // Объединённый тип для всех возможных payload авторизации
// type AuthPayload = FetchAuthReturn | FetchUserReturn;
// type AuthLogoutPayload = FetchAuthChangeReturn | FetchUserReturn;
// // type Store = EnhancedStore<
// //   {
// //     user: UserState;
// //     ingridient: IngridientsState;
// //     constructorIngriedients: ConstructorState;
// //     modal: ModalState;
// //     order: OrderState;
// //     auth: AuthState;
// //   },
// //   UnknownAction,
// //   Tuple<
// //     [
// //       StoreEnhancer<{
// //         dispatch: ThunkDispatch<
// //           {
// //             ingridient: IngridientsState;
// //             constructorIngriedients: ConstructorState;
// //             modal: ModalState;
// //             order: OrderState;
// //             auth: AuthState;
// //             user: UserState;
// //           },
// //           undefined,
// //           UnknownAction
// //         >;
// //       }>,
// //       StoreEnhancer,
// //     ]
// //   >
// // >;

// // Тип состояния приложения

// type RootState = {
//   user: UserState;
//   ingridient: IngridientsState;
//   constructorIngriedients: ConstructorState;
//   modal: ModalState;
//   order: OrderState;
//   auth: AuthState;
// };
// // type UserSyncMiddleware = Middleware<{}, RootState, Dispatch>;

// // Защита типа для проверки наличия user в payload
// const hasUserProperty = (payload: AuthPayload): payload is FetchAuthReturn => {
//   return !!(payload as FetchAuthReturn).user;
// };

// type RelevantAuthAction =
//   | { type: 'auth/register/fulfilled'; payload: AuthPayload }
//   | { type: 'auth/login/fulfilled'; payload: AuthPayload };

// const isRelevantAuthAction = (action: unknown): action is RelevantAuthAction => {
//   return (
//     typeof action === 'object' &&
//     action !== null &&
//     'type' in action &&
//     (action.type === 'auth/register/fulfilled' || action.type === 'auth/login/fulfilled')
//   );
// };
// type RelevantLogoutAction = {
//   type: 'auth/logout/fulfilled';
//   payload: AuthLogoutPayload;
// };

// const isRelevantLogoutAction = (action: unknown): action is RelevantLogoutAction => {
//   return (
//     typeof action === 'object' &&
//     action !== null &&
//     'type' in action &&
//     action.type === 'auth/logout/fulfilled'
//   );
// };
// export const userSyncMiddleware: Middleware<unknown, RootState> =
//   (store) => (next) => (action: unknown) => {
//     // Пропускаем действие дальше по цепочке
//     const result = next(action);
//     // console.log(action?.payload);
//     // Проверяем, является ли действие успешным результатом авторизации
//     // if (action.payload?.user) {
//     // Проверяем тип действия и наличие payload
//     if (isRelevantAuthAction(action)) {
//       // console.log('if-ts');
//       if (
//         (action.type === 'auth/register/fulfilled' ||
//           action.type === 'auth/login/fulfilled') &&
//         hasUserProperty(action.payload)
//       ) {
//         console.log(action.payload);
//         // Синхронизируем данные — отправляем user в userSlice
//         store.dispatch(setUser({ ...action.payload.user, password: '' }));
//       }
//       // }
//     }
//     if (isRelevantLogoutAction(action)) {
//       // Обработка успешного выхода из системы
//       if (action.type === 'auth/logout/fulfilled') {
//         // console.log(action?.payload);
//         // Очищаем данные пользователя в userSlice при успешном выходе
//         store.dispatch(setUser(null));
//       }
//     }
//     return result;
//   };

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
