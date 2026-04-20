import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ERROR_MESSAGE_POST_ORDER_BURGER } from '@/utils/constant';

import { postOrder } from '../apiSlice';

export const sendingOrder = createAsyncThunk(
  'order/sendingOrder',
  async (ingriedientsUser) => {
    const response = await postOrder(ingriedientsUser);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    isLoading: false,
    errorMes: '',
  },
  reducers: {},
  selectors: {
    Sorder: (state) => state.order,
    SisLoading: (state) => state.isLoading,
    SerrorMes: (state) => state.errorMes,
  },
  extraReducers: (builder) => {
    // запрос на формирование заказа
    builder.addCase(sendingOrder.pending, (state) => {
      state.errorMes = '';
      state.isLoading = true;
    });
    builder.addCase(sendingOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMes = action?.error?.message
        ? action?.error?.message
        : ERROR_MESSAGE_POST_ORDER_BURGER;
    });
    builder.addCase(sendingOrder.fulfilled, (state, action) => {
      console.log(action.payload);
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

export const { Sorder, SisLoading, SerrorMes } = orderSlice.selectors;

export default orderSlice.reducer;
