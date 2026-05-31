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

export const formatDateToUI = (isoDateString: string): string => {
  // Создаем объект даты из строки ISO
  const date = new Date(isoDateString);

  // Получаем текущую дату для сравнения (без времени)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // console.log(today)
  // Создаем объект "сегодня" в UTC для корректного сравнения
  const todayUTC = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // console.log(date.getDate());
  // console.log(todayUTC.getDate());
  // Формируем строку дня
  const dayString =
    date.getDate() === todayUTC.getDate()
      ? 'Сегодня'
      : date.getDate() + 1 === todayUTC.getDate()
        ? 'Вчера'
        : date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });

  // Формируем строку времени (часы и минуты)
  // const hours = date.getUTCHours();
  // const minutes = date.getUTCMinutes();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // Добавляем смещение часового пояса (локальное время)
  const timezoneOffset = date.getTimezoneOffset() / 60; // в часах
  const sign = timezoneOffset <= 0 ? '+' : '-';
  const offsetHours = Math.abs(timezoneOffset);
  const timezoneString = `± GMT${sign}${offsetHours}`;

  // Собираем итоговую строку
  return `${dayString}, ${timeString} ${timezoneString}`;
};
