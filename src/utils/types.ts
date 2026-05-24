import type { AsyncThunk } from '@reduxjs/toolkit';

import type {
  Email,
  FetchAuthChangeReturn,
  FetchAuthReturn,
  FetchError,
  FetchLoginArg,
  FetchPasswordResetArg,
  FetchRegisterArg,
  FetchUserReturn,
  Message,
  User,
} from '@/store/types';

export type TIcons = {
  ShowIcon: string;
  EditIcon: string;
};
export type InputConfig = {
  name: 'name' | 'email' | 'password' | 'token';
  placeholder: string;
  // icon: '' | 'ShowIcon' | 'EditIcon';
  icon?: keyof TIcons;
  autoComplete: '' | 'new-password';
};

export type ButtonForm = {
  htmlType: 'submit' | 'button';
  actionButton:
    | AsyncThunk<FetchAuthReturn, FetchRegisterArg, { rejectValue: FetchError }>
    | AsyncThunk<FetchAuthReturn, FetchLoginArg, { rejectValue: FetchError }>
    | AsyncThunk<
        FetchAuthChangeReturn,
        FetchPasswordResetArg,
        { rejectValue: FetchError }
      >
    | AsyncThunk<FetchAuthReturn, User, { rejectValue: FetchError }>
    | AsyncThunk<Message, Email, { rejectValue: FetchError }>
    | AsyncThunk<FetchUserReturn, User, { rejectValue: FetchError }>
    | null;
  text: string;
  textLoad: string;
};

export type FormData = {
  nameForm: 'login' | 'register' | 'forgot-password' | 'reset-password' | 'profile';
  inputs: InputConfig[];
  isButton: boolean;
  buttonsForm: ButtonForm[];
};
