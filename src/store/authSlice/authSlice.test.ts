import { describe, it, expect } from 'vitest';

import { authSlice, clearErrorMesAuth, setIsAuthChecked } from './authSlice';

import type { AuthState } from '../types';

describe('authSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = authSlice.reducer(undefined, { type: '' });
    expect(result).toEqual({
      isAuthChecked: false,
      user: null,
      isLoadingRegister: false,
      errorRegister: '',
      isLoadingLogin: false,
      errorLogin: '',
      isLoadingForgotPassword: false,
      errorForgotPassword: '',
      isLoadingResetPassword: false,
      errorResetPassword: '',
      textLogout: '',
      isLoadingLogout: false,
      errorLogout: '',
    });
  });

  it('сброс всех сообщений об ошибках - clearErrorMesAuth', () => {
    const startState: AuthState = {
      errorRegister: 'errorRegister',
      errorLogin: 'errorLogin',
      errorForgotPassword: 'errorForgotPassword',
      errorResetPassword: 'errorResetPassword',
      textLogout: 'textLogout',
      errorLogout: 'errorLogout',

      isAuthChecked: false,
      user: null,
      isLoadingRegister: false,
      isLoadingLogin: false,
      isLoadingForgotPassword: false,
      isLoadingResetPassword: false,
      isLoadingLogout: false,
    };
    const result = authSlice.reducer(startState, clearErrorMesAuth());
    expect(result.errorRegister).toBe('');
    expect(result.errorLogin).toBe('');
    expect(result.errorForgotPassword).toBe('');
    expect(result.errorResetPassword).toBe('');
    expect(result.textLogout).toBe('');
    expect(result.errorLogout).toBe('');
  });

  it('изменение статуса авторизации', () => {
    const startState: AuthState = {
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
    };
    const result = authSlice.reducer(startState, setIsAuthChecked(true));
    expect(result.isAuthChecked).toBe(true);
  });
});
