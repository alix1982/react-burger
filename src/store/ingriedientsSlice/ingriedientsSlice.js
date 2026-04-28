import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ERROR_MESSAGE_GET_INGRIEDIENTS } from '@/utils/constant';

import { getIngriedients } from '../apiSlice';

export const receivingIngridients = createAsyncThunk(
  'ingridient/receivingIngridients',
  async () => {
    const response = await getIngriedients();
    return response.data;
  }
);

export const ingridientsSlice = createSlice({
  name: 'ingridient',
  initialState: {
    ingriedients: [],
    // ingriedientsUser: BUN_DEFAULT,
    ingridientCard: {},
    isLoading: false,
    errorMes: '',
  },
  reducers: {},
  selectors: {
    Singriedients: (state) => state.ingriedients,
    // SingriedientsUser: (state) => state.ingriedientsUser,
    SisLoading: (state) => state.isLoading,
    SerrorMes: (state) => state.errorMes,
  },
  extraReducers: (builder) => {
    // запрос списка ингридиентов
    builder.addCase(receivingIngridients.pending, (state) => {
      state.errorMes = '';
      state.isLoading = true;
    });
    builder.addCase(receivingIngridients.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMes = action?.error?.message
        ? action?.error?.message
        : ERROR_MESSAGE_GET_INGRIEDIENTS;
    });
    builder.addCase(receivingIngridients.fulfilled, (state, action) => {
      if (Array.isArray(action.payload?.data)) {
        state.isLoading = false;
        state.errorMes = '';
        state.ingriedients = action.payload.data;
      } else {
        state.isLoading = false;
        state.errorMes = ERROR_MESSAGE_GET_INGRIEDIENTS;
        state.ingriedients = [];
      }
    });
  },
});

export const { Singriedients, SisLoading, SerrorMes } = ingridientsSlice.selectors;

export default ingridientsSlice.reducer;
