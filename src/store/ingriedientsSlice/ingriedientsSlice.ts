import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ERROR_MESSAGE_GET_INGRIEDIENTS } from '@/utils/constant';

import { getIngriedients } from '../apiSlice';

import type { RootState } from '..';
import type {
  FetchError,
  FetchIngriedientsReturn,
  IngridientsState,
  Ingriedient,
} from '../types';

export const receivingIngridients = createAsyncThunk<
  FetchIngriedientsReturn,
  void,
  { rejectValue: FetchError }
>('ingridient/receivingIngridients', async () => {
  const response = await getIngriedients();
  return response.data;
});

const initialState: IngridientsState = {
  ingriedients: [],
  // ingridientCard: {},
  isLoading: false,
  errorMes: '',
};

export const ingridientsSlice = createSlice({
  name: 'ingridient',
  initialState,
  reducers: {},
  selectors: {
    // Singriedients: (state) => state.ingriedients,
    // // SingriedientsUser: (state) => state.ingriedientsUser,
    // SisLoading: (state) => state.isLoading,
    // SerrorMes: (state) => state.errorMes,
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

export const Singriedients = (state: RootState): Ingriedient[] =>
  state.ingridient.ingriedients;
export const SisLoading = (state: RootState): boolean => state.ingridient.isLoading;
export const SerrorMes = (state: RootState): string => state.ingridient.errorMes;

// export const { Singriedients, SisLoading, SerrorMes } = ingridientsSlice.selectors;

export default ingridientsSlice.reducer;
