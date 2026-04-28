import {
  // createAsyncThunk,
  createSlice,
  nanoid,
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
    setIngriedientsUser: {
      reducer: (state, action) => {
        // console.log(action);
        const ingredients = [...action.payload];
        if (ingredients.length > 2) {
          state.ingriedientsUser = ingredients.filter(
            (item) => item.type !== 'ingriedientDefault'
          );
        } else {
          state.ingriedientsUser = ingredients;
        }
      },
      prepare: (ingriedients) => {
        // console.log(ingriedients);
        const newIngriedients = ingriedients.map((ingriedient) => {
          const newIngriedient = {
            ...ingriedient,
            uuid: nanoid(),
          };
          return newIngriedient;
        });
        return { payload: newIngriedients };
      },
    },
    // addIngriedientsBurger: (state, action) => {
    //   const { ingredient } = action.payload;
    //   if (ingredient.type !== 'bun') {
    //     state.ingriedientsUser = [...state.ingriedientsUser, ingredient];
    //   } else {
    //     state.ingriedientsUser = [ingredient, ...state.ingriedientsUser.slice(1)];
    //   }
    // },
    deleteIngridient: (state, action) => {
      const { index } = action.payload;
      const newIngredients = [...state.ingriedientsUser];
      newIngredients.splice(index, 1);
      const ingriedient = newIngredients.find(
        (item) => item.type === 'main' || item.type === 'sauce'
      );
      if (!ingriedient) {
        newIngredients.splice(index, 0, BUN_DEFAULT[1]);
      }
      state.ingriedientsUser = newIngredients;
    },
  },
  selectors: {
    SingriedientsUser: (state) => state.ingriedientsUser,
    SisLoadingConstructor: (state) => state.isLoadingConstructor,
    SerrorMes: (state) => state.errorMes,
  },
});

export const { setIngriedientsUser, deleteIngridient } = constructorSlice.actions;

export const { SingriedientsUser, SisLoadingConstructor, SerrorMes } =
  constructorSlice.selectors;

export default constructorSlice.reducer;
