import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { BUN_DEFAULT } from '@/utils/constant';

import type { RootState } from '..';
import type { Ingriedient, ModalState } from '../types';

const initialState: ModalState = {
  ingriedientCard: BUN_DEFAULT[0],
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIngridientModal: (state, action: PayloadAction<{ ingredient: Ingriedient }>) => {
      const {
        // isModalIngridient,
        ingredient = BUN_DEFAULT[0],
      } = action.payload;
      state.ingriedientCard = ingredient;
      // state.ingridientModalOn = isModalIngridient;
    },
    // setOrderModal: (state, action) => {
    //   state.orderModalOn = action.payload;
    // },
  },
  selectors: {
    // SingriedientModal: (state) => state.ingridientModalOn,
    // SorderModal: (state) => state.orderModalOn,
    SingriedientCard: (state) => state.ingriedientCard,
  },
});

export const {
  setIngridientModal,
  // setOrderModal
} = modalSlice.actions;

export const SingriedientCard = (state: RootState): Ingriedient =>
  state.modal.ingriedientCard;
// export const {
//   // SingriedientModal,
//   // SorderModal,
//   SingriedientCard,
// } = modalSlice.selectors;

export default modalSlice.reducer;
