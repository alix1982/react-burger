import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '..';
import type { MessageSocket, SocketState } from '../types';

// Начальное состояние
const initialState: SocketState = {
  isConnected: false,
  messages: [],
  errorMesSocket: null,
  isLoadingSocket: false,
};

// export const sendingOrder = createAsyncThunk<
//   FetchOrderReturn,
//   FetchOrderArg,
//   { rejectValue: FetchError }
// >('order/sendingOrder', async (ingriedientsUser) => {
//   const response = await postOrder(ingriedientsUser);
//   return response.data;
// });

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    // Управляющие редьюсеры
    connect: (state, action) => {
      console.log(action);
      state.isLoadingSocket = true;
      state.errorMesSocket = null;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.messages = [];
      state.isLoadingSocket = false;
    },
    sendMessage: () => {
      // Middleware будет обрабатывать отправку - не используется в проекте
    },
    // Событийные редьюсеры
    onOpen: (state) => {
      state.isLoadingSocket = false;
      state.isConnected = true;
      state.errorMesSocket = null;
    },
    onMessage: (state, action: PayloadAction<MessageSocket>) => {
      state.messages.push(action.payload as unknown as MessageSocket);
    },
    onError: (state, action: PayloadAction<string>) => {
      if (typeof action.payload === 'string') {
        state.errorMesSocket = action.payload;
      }
      state.isLoadingSocket = false;
    },
    onClose: (state) => {
      state.isConnected = false;
      state.isLoadingSocket = false;
    },
  },
  selectors: {
    // Sorder: (state) => state.order,
    // SisLoadingSocket: (state) => state.isLoadingSocket,
    // SerrorMes: (state) => state.errorMes,
  },
});

export const Smessages = (state: RootState): MessageSocket[] => state.socket.messages;
export const SisLoadingSocket = (state: RootState): boolean =>
  state.socket.isLoadingSocket;
export const SerrorMesSocket = (state: RootState): string | null =>
  state.socket.errorMesSocket;
// export const SerrorMes = (state: RootState): string => state.order.errorMes;
// export const { Sorder, SisLoadingSocket, SerrorMes } = orderSlice.selectors;

// Экспортируем экшены
export const { connect, disconnect, sendMessage, onOpen, onMessage, onError, onClose } =
  socketSlice.actions;

export default socketSlice.reducer;
