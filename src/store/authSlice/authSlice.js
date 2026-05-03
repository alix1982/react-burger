import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  ERROR_MESSAGE_POST_FORGOT_PASSWORD,
  ERROR_MESSAGE_POST_LOGIN,
  ERROR_MESSAGE_POST_LOGOUT,
  ERROR_MESSAGE_POST_REGISTER,
  ERROR_MESSAGE_POST_RESET_PASSWORD,
} from '@/utils/constant';
import { addTokenInStorage, clearTokenInStorage } from '@/utils/helpers';

import {
  postChangePassword,
  postLogin,
  postLogout,
  postRegister,
  postResetPassword,
} from '../apiSlice';

export const register = createAsyncThunk('auth/register', async (dataRegister) => {
  const response = await postRegister(dataRegister);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (dataLogin) => {
  const response = await postLogin(dataLogin);
  return response.data;
});

export const changePassword = createAsyncThunk('auth/changePassword', async (data) => {
  const response = await postChangePassword(data);
  return response.data;
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data) => {
  const response = await postResetPassword(data);
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await postLogout();
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthChecked: false,
    user: null,
    isLoadingRegister: false,
    errorRegister: '',
    isLoadingLogin: false,
    errorLogin: '',
    // textForgotPassword: '',
    isLoadingForgotPassword: false,
    errorForgotPassword: '',
    isLoadingResetPassword: false,
    errorResetPassword: '',
    textLogout: '',
    isLoadingLogout: false,
    errorLogout: '',
  },
  reducers: {
    clearErrorMesAuth: (state) => {
      state.errorRegister = '';
      state.errorLogin = '';
      state.errorForgotPassword = '';
      state.errorResetPassword = '';
      state.errorLogout = '';
      state.textLogout = '';
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
  selectors: {
    SisAuthChecked: (state) => state.isAuthChecked,
    SuserAuth: (state) => state.user,
    SisLoadingRegister: (state) => state.isLoadingRegister,
    SerrorRegister: (state) => state.errorRegister,
    SisLoadingLogin: (state) => state.isLoadingLogin,
    SerrorLogin: (state) => state.errorLogin,
    SisLoadingForgotPassword: (state) => state.isLoadingForgotPassword,
    SerrorForgotPassword: (state) => state.errorForgotPassword,
    SisLoadingResetPassword: (state) => state.isLoadingResetPassword,
    SerrorResetPassword: (state) => state.errorResetPassword,
    StextLogout: (state) => state.textLogout,
    SisLoadingLogout: (state) => state.isLoadingLogout,
    SerrorLogout: (state) => state.errorLogout,
  },
  extraReducers: (builder) => {
    // регистрация
    builder.addCase(register.pending, (state) => {
      state.isAuthChecked = false;
      state.errorRegister = '';
      state.isLoadingRegister = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isAuthChecked = true;
      state.isLoadingRegister = false;
      state.errorRegister = action?.error?.message
        ? action.error.message
        : ERROR_MESSAGE_POST_REGISTER;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      // console.log(action.payload);
      if (action.payload?.user) {
        state.isLoadingRegister = false;
        state.errorRegister = '';
        state.user = { ...action.payload.user, password: '' };
        addTokenInStorage(action.payload);
        state.isAuthChecked = true;
        // document.cookie = `accessToken=${action.payload.accessToken}; path=/; secure; samesite=strict`;
        // localStorage.setItem('refreshToken', action.payload.refreshToken);
      } else {
        state.isLoadingRegister = false;
        state.errorRegister = ERROR_MESSAGE_POST_REGISTER;
        state.user = null;
        state.isAuthChecked = true;
      }
    });

    // вход
    builder.addCase(login.pending, (state) => {
      state.isAuthChecked = false;
      state.errorLogin = '';
      state.isLoadingLogin = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthChecked = true;
      state.isLoadingLogin = false;
      state.errorLogin = action?.error?.message
        ? action.error.message
        : ERROR_MESSAGE_POST_LOGIN;
      // console.log(state.errorLogin);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload?.user) {
        state.isLoadingLogin = false;
        state.errorLogin = '';
        state.user = { ...action.payload.user, password: '' };
        addTokenInStorage(action.payload);
        state.isAuthChecked = true;
        // document.cookie = `accessToken=${action.payload.accessToken}; path=/; secure; samesite=strict`;
        // localStorage.setItem('refreshToken', action.payload.refreshToken);
      } else {
        state.isLoadingLogin = false;
        state.errorLogin = ERROR_MESSAGE_POST_LOGIN;
        state.user = null;
        state.isAuthChecked = true;
      }
    });

    // изменение пароля
    builder.addCase(changePassword.pending, (state) => {
      // state.textForgotPassword = '';
      state.errorForgotPassword = '';
      state.isLoadingForgotPassword = true;
    });
    builder.addCase(changePassword.rejected, (state) => {
      // state.textForgotPassword = '';
      state.isLoadingForgotPassword = false;
      state.errorForgotPassword = ERROR_MESSAGE_POST_FORGOT_PASSWORD;
      localStorage.removeItem('isChangePassword');
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      // console.log(action.payload);
      state.isLoadingForgotPassword = false;
      state.errorForgotPassword = '';
      localStorage.setItem('isChangePassword', true);
    });

    // сброс пароля
    builder.addCase(resetPassword.pending, (state) => {
      state.errorResetPassword = '';
      state.isLoadingResetPassword = true;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.isLoadingResetPassword = false;
      state.errorResetPassword = ERROR_MESSAGE_POST_RESET_PASSWORD;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      // console.log(action.payload);
      state.isLoadingResetPassword = false;
      state.errorResetPassword = '';
      localStorage.removeItem('isChangePassword');
    });

    // выход пользователя
    builder.addCase(logout.pending, (state) => {
      state.textLogout = '';
      state.errorLogout = '';
      state.isLoadingLogout = true;
    });
    builder.addCase(logout.rejected, (state) => {
      state.textLogout = '';
      state.isLoadingLogout = false;
      state.errorLogout = ERROR_MESSAGE_POST_LOGOUT;
      // console.log('slice-reject');
      clearTokenInStorage();
      state.user = null;
      // state.isAuth = false;
      // localStorage.removeItem('refreshToken');
      // document.cookie = 'accessToken=; path=/; secure; samesite=strict';
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoadingLogout = false;
      state.errorLogout = '';
      state.textLogout = action.payload.message;
      // console.log('slice-fulfilled');
      clearTokenInStorage();
      state.user = null;
      // state.isAuth = false;
      // localStorage.removeItem('refreshToken');
      // document.cookie = 'accessToken=; path=/; secure; samesite=strict';
    });
  },
});

export const { clearErrorMesAuth, setIsAuthChecked } = authSlice.actions;

export const {
  SisAuthChecked,
  SuserAuth,
  SisLoadingRegister,
  SerrorRegister,
  SisLoadingLogin,
  SerrorLogin,
  // StextForgotPassword,
  SisLoadingForgotPassword,
  SerrorForgotPassword,
  SisLoadingResetPassword,
  SerrorResetPassword,
  StextLogout,
  SisLoadingLogout,
  SerrorLogout,
} = authSlice.selectors;

export default authSlice.reducer;
