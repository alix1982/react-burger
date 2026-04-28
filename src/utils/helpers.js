export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

export const addTokenInStorage = (data) => {
  document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;
  localStorage.setItem('refreshToken', data.refreshToken);
};

export const clearTokenInStorage = () => {
  console.log('clearToken');
  localStorage.removeItem('refreshToken');
  document.cookie = 'accessToken=; path=/; secure; samesite=strict';
};
