import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { BUN_DEFAULT } from '@/utils/constant';

import type { RootState } from '..';
import type { Ingriedient, ModalState, OrderSocket } from '../types';

export const initialState: ModalState = {
  modalDataCard: BUN_DEFAULT[0],
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalData: (
      state,
      action: PayloadAction<{ modalData: Ingriedient | OrderSocket }>
    ) => {
      const {
        // isModalIngridient,
        modalData = BUN_DEFAULT[0],
      } = action.payload;
      state.modalDataCard = modalData;
      // state.ingridientModalOn = isModalIngridient;
    },
    // setOrderModal: (state, action) => {
    //   state.orderModalOn = action.payload;
    // },
  },
  selectors: {
    // SingriedientModal: (state) => state.ingridientModalOn,
    // SorderModal: (state) => state.orderModalOn,
    // SmodalDataCard: (state) => state.modalDataCard,
  },
});

export const {
  setModalData,
  // setOrderModal
} = modalSlice.actions;

export const SmodalDataCard = (state: RootState): Ingriedient | OrderSocket =>
  state.modal.modalDataCard;
// export const {
//   // SingriedientModal,
//   // SorderModal,
//   SingriedientCard,
// } = modalSlice.selectors;

export default modalSlice.reducer;
