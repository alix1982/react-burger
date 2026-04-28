import { createSlice } from '@reduxjs/toolkit';

import { BUN_DEFAULT } from '@/utils/constant';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    ingridientModalOn: false,
    ingriedientCard: BUN_DEFAULT[0],
    orderModalOn: false,
  },
  reducers: {
    setIngridientModal: (state, action) => {
      const { isModalIngridient, ingredient = BUN_DEFAULT[0] } = action.payload;
      state.ingriedientCard = ingredient;
      state.ingridientModalOn = isModalIngridient;
    },
    setOrderModal: (state, action) => {
      state.orderModalOn = action.payload;
    },
  },
  selectors: {
    SingriedientModal: (state) => state.ingridientModalOn,
    SorderModal: (state) => state.orderModalOn,
    SingriedientCard: (state) => state.ingriedientCard,
  },
});

export const { setIngridientModal, setOrderModal } = modalSlice.actions;

export const { SingriedientModal, SorderModal, SingriedientCard } = modalSlice.selectors;

export default modalSlice.reducer;
