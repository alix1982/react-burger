import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '..';
import type { MessageSocket, SocketState } from '../types';

// Начальное состояние
const initialState: SocketState = {
  isConnected: false,
  messages: [],
  errorMes: null,
  isLoading: false,
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
    connect: (state) => {
      state.isLoading = true;
      state.errorMes = null;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.messages = [];
      state.isLoading = false;
    },
    sendMessage: () => {
      // Middleware будет обрабатывать отправку - не используется в проекте
    },
    // Событийные редьюсеры
    onOpen: (state) => {
      state.isLoading = false;
      state.isConnected = true;
      state.errorMes = null;
    },
    onMessage: (state, action: PayloadAction) => {
      state.messages.push(action.payload as unknown as MessageSocket);
    },
    onError: (state, action: PayloadAction<string>) => {
      if (typeof action.payload === 'string') {
        state.errorMes = action.payload;
      }
      state.isLoading = false;
    },
    onClose: (state) => {
      state.isConnected = false;
      state.isLoading = false;
    },
  },
  selectors: {
    // Sorder: (state) => state.order,
    // SisLoading: (state) => state.isLoading,
    // SerrorMes: (state) => state.errorMes,
  },
});

export const Smessages = (state: RootState): MessageSocket[] => state.socket.messages;
// export const SisLoading = (state: RootState): boolean => state.order.isLoading;
// export const SerrorMes = (state: RootState): string => state.order.errorMes;
// export const { Sorder, SisLoading, SerrorMes } = orderSlice.selectors;

// Экспортируем экшены
export const { connect, disconnect, sendMessage, onOpen, onMessage, onError, onClose } =
  socketSlice.actions;

export default socketSlice.reducer;
