import {
  // createAsyncThunk,
  createSlice,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { BUN_DEFAULT } from '@/utils/constant';

import type { RootState } from '..';
import type { ConstructorState, Ingriedient } from '../types';

const initialState: ConstructorState = {
  ingriedientsUser: BUN_DEFAULT,
  isLoadingConstructor: false,
  errorMes: '',
};

export const constructorSlice = createSlice({
  name: 'constructorIngriedients',
  initialState,
  reducers: {
    setIngriedientsUser: {
      reducer: (state, action: PayloadAction<Ingriedient[]>) => {
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
      prepare: (ingriedients: Ingriedient[]) => {
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
    deleteIngridient: (state, action: PayloadAction<{ index: number }>) => {
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
    // SingriedientsUser: (state) => state.ingriedientsUser,
    // SisLoadingConstructor: (state) => state.isLoadingConstructor,
    // SerrorMes: (state) => state.errorMes,
  },
});

export const SingriedientsUser = (state: RootState): Ingriedient[] =>
  state.constructorIngriedients.ingriedientsUser;
export const SisLoadingConstructor = (state: RootState): boolean =>
  state.constructorIngriedients.isLoadingConstructor;
export const SerrorMes = (state: RootState): string =>
  state.constructorIngriedients.errorMes;

export const { setIngriedientsUser, deleteIngridient } = constructorSlice.actions;

// export const { SingriedientsUser, SisLoadingConstructor, SerrorMes } =
//   constructorSlice.selectors;

export default constructorSlice.reducer;
