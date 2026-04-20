import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { constructorSlice } from './constructorSlice/constructorSlice';
import { ingridientsSlice } from './ingriedientsSlice/ingriedientsSlice';
import { modalSlice } from './modalSlice/modalSlice';
import { orderSlice } from './orderSlice/orderSlice';

const rootReducer = combineSlices(
  ingridientsSlice,
  constructorSlice,
  modalSlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
