import type { TokenFull } from '@/store/types';

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null;
  }
  return null;
};

export const addTokenInStorage = (data: TokenFull): void => {
  document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;
  localStorage.setItem('refreshToken', data.refreshToken);
};

export const clearTokenInStorage = (): void => {
  // console.log('clearToken');
  localStorage.removeItem('refreshToken');
  document.cookie = 'accessToken=; path=/; secure; samesite=strict';
};
