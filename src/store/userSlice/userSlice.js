import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ERROR_MESSAGE_GET_USER, ERROR_MESSAGE_PATCH_USER } from '@/utils/constant';

import { getUser, patchUser } from '../apiSlice';
import { setIsAuthChecked } from '../authSlice/authSlice';

export const receivingUser = createAsyncThunk(
  'user/receivingUser',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setIsAuthChecked(false));
    try {
      const response = await getUser();
      dispatch(setIsAuthChecked(true));
      return response.data;
    } catch (error) {
      dispatch(setIsAuthChecked(true));
      return rejectWithValue(error);
    }
  }
);

export const changeUser = createAsyncThunk('user/changeUser', async (data) => {
  const response = await patchUser(data);
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoadingGetUser: false,
    errorGetUser: '',
    isLoadingPatchUser: false,
    errorPatchUser: '',
  },
  reducers: {
    clearErrorMesUser: (state) => {
      state.errorGetUser = '';
      state.errorPatchUser = '';
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  selectors: {
    Suser: (state) => state.user,
    SisLoadingGetUser: (state) => state.isLoadingGetUser,
    SerrorGetUser: (state) => state.errorGetUser,
    SisLoadingPatchUser: (state) => state.isLoadingPatchUser,
    SerrorPatchUser: (state) => state.errorPatchUser,
  },
  extraReducers: (builder) => {
    // запрос данных пользователя
    builder.addCase(receivingUser.pending, (state) => {
      state.errorGetUser = '';
      state.isLoadingGetUser = true;
    });
    builder.addCase(receivingUser.rejected, (state, action) => {
      state.isLoadingGetUser = false;
      state.errorGetUser = action?.payload?.message
        ? action?.payload?.message
        : ERROR_MESSAGE_GET_USER;
      // state.errorGetUser = action?.error?.message
      //   ? action?.error?.message
      //   : ERROR_MESSAGE_GET_USER;
    });
    builder.addCase(receivingUser.fulfilled, (state, action) => {
      if (action.payload?.user) {
        state.isLoadingGetUser = false;
        state.errorGetUser = '';
        state.user = { ...action.payload.user, password: '' };
      } else {
        state.isLoadingGetUser = false;
        state.errorGetUser = ERROR_MESSAGE_GET_USER;
        state.user = null;
      }
    });

    // изменение данных пользователя
    builder.addCase(changeUser.pending, (state) => {
      state.errorPatchUser = '';
      state.isLoadingPatchUser = true;
    });
    builder.addCase(changeUser.rejected, (state, action) => {
      state.isLoadingPatchUser = false;
      state.errorPatchUser = action?.error?.message
        ? action?.error?.message
        : ERROR_MESSAGE_PATCH_USER;
    });
    builder.addCase(changeUser.fulfilled, (state, action) => {
      if (action.payload?.user) {
        state.isLoadingPatchUser = false;
        state.errorPatchUser = '';
        state.user = { ...action.payload.user, password: '' };
      } else {
        state.isLoadingPatchUser = false;
        state.errorPatchUser = ERROR_MESSAGE_PATCH_USER;
        state.user = null;
      }
    });
  },
});

export const { clearErrorMesUser, setUser } = userSlice.actions;

export const {
  Suser,
  SisLoadingGetUser,
  SerrorGetUser,
  SisLoadingPatchUser,
  SerrorPatchUser,
} = userSlice.selectors;

export default userSlice.reducer;
