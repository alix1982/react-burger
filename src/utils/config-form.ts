import {
  login,
  register,
  changePassword,
  resetPassword,
} from '@/store/authSlice/authSlice';
import { changeUser } from '@/store/userSlice/userSlice';

import type { FormData } from './types';

export const formLoginData: FormData = {
  nameForm: 'login',
  inputs: [
    {
      name: 'email',
      placeholder: 'E-mail',
      // icon: '',
      autoComplete: '',
    },
    {
      name: 'password',
      placeholder: '',
      icon: 'ShowIcon',
      autoComplete: 'new-password',
    },
  ],
  isButton: true,
  buttonsForm: [
    {
      htmlType: 'submit',
      actionButton: login,
      text: 'Войти',
      textLoad: 'Вход...',
    },
  ],
};

export const formRegisterData: FormData = {
  nameForm: 'register',
  inputs: [
    {
      name: 'name',
      placeholder: 'Имя',
      // icon: '',
      autoComplete: '',
    },
    {
      name: 'email',
      placeholder: 'E-mail',
      // icon: '',
      autoComplete: '',
    },
    {
      name: 'password',
      placeholder: '',
      icon: 'ShowIcon',
      autoComplete: 'new-password',
    },
  ],
  isButton: true,
  buttonsForm: [
    {
      htmlType: 'submit',
      actionButton: register,
      text: 'Зарегистрироваться',
      textLoad: 'Регистрация...',
    },
  ],
};

export const formForgotPasswordData: FormData = {
  nameForm: 'forgot-password',
  inputs: [
    {
      name: 'email',
      placeholder: 'Укажите e-mail',
      // icon: '',
      autoComplete: '',
    },
  ],
  isButton: true,
  buttonsForm: [
    {
      htmlType: 'submit',
      actionButton: changePassword,
      text: 'Восстановить',
      textLoad: 'Восстанавливаем...',
    },
  ],
};

export const formResetPasswordData: FormData = {
  nameForm: 'reset-password',
  inputs: [
    {
      name: 'password',
      placeholder: 'Введите новый пароль',
      icon: 'ShowIcon',
      autoComplete: 'new-password',
    },
    {
      name: 'token',
      placeholder: 'Введите код из письма',
      // icon: '',
      autoComplete: '',
    },
  ],
  isButton: true,
  buttonsForm: [
    {
      htmlType: 'submit',
      actionButton: resetPassword,
      text: 'Сохранить',
      textLoad: 'Сохраняем...',
    },
  ],
};

export const formProfileData: FormData = {
  nameForm: 'profile',
  inputs: [
    {
      name: 'name',
      placeholder: 'Имя',
      icon: 'EditIcon',
      autoComplete: '',
    },
    {
      name: 'email',
      placeholder: 'Логин',
      icon: 'EditIcon',
      autoComplete: '',
    },
    {
      name: 'password',
      placeholder: 'Пароль',
      icon: 'ShowIcon',
      autoComplete: 'new-password',
    },
  ],
  isButton: false,
  buttonsForm: [
    {
      htmlType: 'submit',
      actionButton: changeUser,
      text: 'Сохранить',
      textLoad: 'Сохранение...',
    },
    {
      htmlType: 'button',
      actionButton: null,
      text: 'Отмена',
      textLoad: 'Сброс...',
    },
  ],
};
