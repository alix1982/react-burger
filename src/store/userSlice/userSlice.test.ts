import { describe, it, expect } from 'vitest';

import { clearErrorMesUser, setUser, userSlice } from './userSlice';
// import { clearErrorMesUser, setUser } from './userSlice';

describe('userSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = userSlice.reducer(undefined, { type: '' });
    expect(result).toEqual({
      user: null,
      isLoadingGetUser: false,
      errorGetUser: '',
      isLoadingPatchUser: false,
      errorPatchUser: '',
    });
  });

  it('сбрасываем ошибки', () => {
    const startState = {
      errorGetUser: 'errorGet',
      errorPatchUser: 'errorPatch',
      user: null,
      isLoadingGetUser: false,
      isLoadingPatchUser: false,
    };
    const result = userSlice.reducer(startState, clearErrorMesUser());
    expect(result.errorGetUser).toBe('');
    expect(result.errorPatchUser).toBe('');
  });

  it('меняем данные пользователя', () => {
    const startState = {
      user: null,
      isLoadingGetUser: false,
      errorGetUser: '',
      isLoadingPatchUser: false,
      errorPatchUser: '',
    };

    const newUser = {
      name: 'UserTest',
      email: 'as@zx.en',
      password: '12345',
    };

    const result = userSlice.reducer(startState, setUser(newUser));
    expect(result.user).toEqual({
      name: 'UserTest',
      email: 'as@zx.en',
      password: '12345',
    });
  });
});
