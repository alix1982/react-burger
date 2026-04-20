import {
  // createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { BUN_DEFAULT } from '@/utils/constant';

export const constructorSlice = createSlice({
  name: 'constructorIngriedients',
  initialState: {
    ingriedientsUser: BUN_DEFAULT,
    isLoadingConstructor: false,
    errorMes: '',
  },
  reducers: {
    setIngriedientsUser: (state, action) => {
      state.ingriedientsUser = action.payload;
    },
    addIngriedientsBurger: (state, action) => {
      console.log('add');
      const { ingredient } = action.payload;
      if (ingredient.type !== 'bun') {
        state.ingriedientsUser = [...state.ingriedientsUser, ingredient];
      } else {
        state.ingriedientsUser = [ingredient, ...state.ingriedientsUser.slice(1)];
      }
    },
    deleteIngridient: (state, action) => {
      const { index, e } = action.payload;
      e.stopPropagation();
      const newIngredients = [...state.ingriedientsUser];
      newIngredients.splice(index, 1);
      state.ingriedientsUser = newIngredients;
      // dispatch(setIngriedientsUser(newIngredients));
      // state.ingridientCard = action.payload;
    },
  },
  selectors: {
    SingriedientsUser: (state) => state.ingriedientsUser,
    SisLoadingConstructor: (state) => state.isLoadingConstructor,
    SerrorMes: (state) => state.errorMes,
  },
});

export const { setIngriedientsUser, addIngriedientsBurger, deleteIngridient } =
  constructorSlice.actions;

export const { SingriedientsUser, SisLoadingConstructor, SerrorMes } =
  constructorSlice.selectors;

export default constructorSlice.reducer;
