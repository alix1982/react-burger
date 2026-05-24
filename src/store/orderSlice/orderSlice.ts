import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ERROR_MESSAGE_POST_ORDER_BURGER } from '@/utils/constant';

import { postOrder } from '../apiSlice';

import type { RootState } from '..';
import type {
  FetchError,
  FetchOrderArg,
  FetchOrderReturn,
  Order,
  OrderState,
} from '../types';

const initialState: OrderState = {
  order: {},
  isLoading: false,
  errorMes: '',
};
export const sendingOrder = createAsyncThunk<
  FetchOrderReturn,
  FetchOrderArg,
  { rejectValue: FetchError }
>('order/sendingOrder', async (ingriedientsUser) => {
  const response = await postOrder(ingriedientsUser);
  return response.data;
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    // Sorder: (state) => state.order,
    // SisLoading: (state) => state.isLoading,
    // SerrorMes: (state) => state.errorMes,
  },
  extraReducers: (builder) => {
    // запрос на формирование заказа
    builder.addCase(sendingOrder.pending, (state) => {
      state.errorMes = '';
      state.isLoading = true;
    });
    builder.addCase(sendingOrder.rejected, (state) => {
      state.isLoading = false;
      // state.errorMes = action?.error?.message
      //   ? action?.error?.message
      //   : ERROR_MESSAGE_POST_ORDER_BURGER;
      // из-за не стандартного ответа сервера в виде html-страницы
      state.errorMes = ERROR_MESSAGE_POST_ORDER_BURGER;
    });
    builder.addCase(sendingOrder.fulfilled, (state, action) => {
      if (action.payload?.order?.number) {
        state.isLoading = false;
        state.errorMes = '';
        state.order = action.payload.order;
      } else {
        state.isLoading = false;
        state.errorMes = ERROR_MESSAGE_POST_ORDER_BURGER;
        state.order = {};
      }
    });
  },
});

export const Sorder = (state: RootState): Order => state.order.order;
export const SisLoading = (state: RootState): boolean => state.order.isLoading;
export const SerrorMes = (state: RootState): string => state.order.errorMes;
// export const { Sorder, SisLoading, SerrorMes } = orderSlice.selectors;

export default orderSlice.reducer;
