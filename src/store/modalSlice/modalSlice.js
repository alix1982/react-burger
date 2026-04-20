import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    ingridientModalOn: false,
    orderModalOn: false,
  },
  reducers: {
    setIngridientModal: (state, action) => {
      state.ingridientModalOn = action.payload;
    },
    setOrderModal: (state, action) => {
      state.orderModalOn = action.payload;
    },
  },
  selectors: {
    SingriedientModal: (state) => state.ingridientModalOn,
    SorderModal: (state) => state.orderModalOn,
  },
});

export const { setIngridientModal, setOrderModal } = modalSlice.actions;

export const { SingriedientModal, SorderModal } = modalSlice.selectors;

export default modalSlice.reducer;
