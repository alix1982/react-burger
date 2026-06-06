import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authSlice/authSlice';
import { constructorSlice } from './constructorSlice/constructorSlice';
import { ingridientsSlice } from './ingriedientsSlice/ingriedientsSlice';
import {
  socketSyncMiddleware,
  userSyncMiddleware,
} from './middleware/storeSyncMiddleware';
import { modalSlice } from './modalSlice/modalSlice';
import { orderSlice } from './orderSlice/orderSlice';
import { socketSlice } from './socketSlice/socketSlice';
import { userSlice } from './userSlice/userSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineSlices(
  ingridientsSlice,
  constructorSlice,
  modalSlice,
  orderSlice,
  authSlice,
  userSlice,
  socketSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSyncMiddleware).concat(socketSyncMiddleware),
});
