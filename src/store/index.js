import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authSlice/authSlice';
import { constructorSlice } from './constructorSlice/constructorSlice';
import { ingridientsSlice } from './ingriedientsSlice/ingriedientsSlice';
import { userSyncMiddleware } from './middleware/userSyncMiddleware';
import { modalSlice } from './modalSlice/modalSlice';
import { orderSlice } from './orderSlice/orderSlice';
import { userSlice } from './userSlice/userSlice';

const rootReducer = combineSlices(
  ingridientsSlice,
  constructorSlice,
  modalSlice,
  orderSlice,
  authSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSyncMiddleware),
});
