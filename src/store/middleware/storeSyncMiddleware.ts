// версия TS
import { SOCKET_URL } from '@/utils/constant';
import { getCookie } from '@/utils/helpers';

import {
  connect,
  disconnect,
  onClose,
  onError,
  onMessage,
  onOpen,
} from '../socketSlice/socketSlice';
import { setUser } from '../userSlice/userSlice';

import type { Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';

import type { AppDispatch } from '..';
import type {
  AuthState,
  ConstructorState,
  FetchAuthChangeReturn,
  FetchAuthReturn,
  FetchUserReturn,
  IngridientsState,
  MessageSocket,
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

    // const { type } = action as PayloadAction;

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

//socket
let ws: WebSocket | null = null;

// подключение вебсокета
let isConnected = false;
const reconnectPeriod = 3000;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
// URL, по которому подключались
// let currentUrl = '';
let reconnectTimerId: NodeJS.Timeout | number = 0;

export const socketSyncMiddleware: Middleware =
  (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    const result = next(action);

    const { type } = action as PayloadAction;
    //socket
    if (type === 'socket/connect') {
      console.log('slice-connect');
      console.log(action);
      // const { payload: token } = action as PayloadAction<string>;

      // const connectAction = action as PayloadAction<string>;
      // const url = connectAction.payload;
      // isConnected = true;
      // currentUrl = url;
      // connect(store, { url });

      // Закрываем старое соединение, если есть
      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('close old connection');
        ws.close();
      }

      // Создаём новый WebSocket
      const token = getCookie('accessToken')?.split(' ')[1];
      ws = new WebSocket(`${SOCKET_URL}?token=${token}`);

      isConnected = true;
      reconnectAttempts = 0;

      // Обработчик открытия соединения
      ws.onopen = (): void => {
        console.log('socket-open');
        store.dispatch(onOpen());
      };

      // Обработчик входящих сообщений
      ws.onmessage = (event: MessageEvent<string>): void => {
        // console.log(event);
        try {
          console.log('socket-message');
          const data = JSON.parse(event.data);
          // console.log(data);
          store.dispatch(onMessage(data));
        } catch (error) {
          console.log(error);
          store.dispatch(onError('Ошибка парсинга сообщения от сервера'));
        }
      };

      // Обработчик ошибок
      ws.onerror = (): void => {
        console.log('socket- error');
        store.dispatch(onError('Ошибка WebSocket-соединения'));
      };

      // Обработчик закрытия соединения
      ws.onclose = (): void => {
        console.log('socket-close');
        store.dispatch(onClose());
        ws = null;
        // if (isConnected) {
        //   setTimeout(() => {
        //     store.dispatch(connect());
        //   }, reconnectPeriod);
        // }
        if (isConnected && reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log(`Reconnecting... Attempt ${reconnectAttempts}`);
          reconnectTimerId = setTimeout(() => {
            store.dispatch(connect());
          }, reconnectPeriod * reconnectAttempts); // экспоненциальный бэкофф
        }
      };
    }

    // Обработка экшена sendMessage - не используется в проекте
    if (type === 'socket/sendMessage') {
      const { payload: message } = action as PayloadAction<MessageSocket>;
      console.log('slice-sendMessage');
      // Проверяем: ws существует (не null) и соединение открыто (readyState === WebSocket.OPEN)
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    }

    // Обработка экшена disconnect
    if (type === 'socket/disconnect') {
      console.log('slice-disconnect');
      clearTimeout(reconnectTimerId); // Отменяем запланированное переподключение
      reconnectTimerId = 0; // Сбрасываем id таймера
      isConnected = false; // меняем статус сокета на отключено
      disconnect();

      if (ws) {
        ws.close();
        ws = null;
      }
    }
    return result;
  };

// const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
// socket.addEventListener('open', () => {
//   console.log('Соединение установлено');
//   socketStatus = 'open';
//   socket.send(JSON.stringify({
//     content: '0',
//     type: 'get old',
//   }));
//   // socket.send(JSON.stringify({
//   //   content: 'Моё первое сообщение миру!',
//   //   type: 'message',
//   // }));
// });

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
