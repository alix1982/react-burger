// общие
export type Name = { name: string };
export type Email = { email: string };
export type Password = { password: string };
export type Message = { message: string };
export type Token = { token: string };
export type TokenFull = {
  accessToken: string;
  refreshToken: string;
};

export type Ingriedient = {
  _id: string;
  uuid: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type User = Name & Email & Password;

export type FetchError = (Message & { code: number }) | unknown;

// authSlice
export type AuthState = {
  // error: string | null;
  isAuthChecked: boolean;
  user: User | null;
  isLoadingRegister: boolean;
  errorRegister: string;
  isLoadingLogin: boolean;
  errorLogin: string;
  // textForgotPassword: string;
  isLoadingForgotPassword: boolean;
  errorForgotPassword: string;
  isLoadingResetPassword: boolean;
  errorResetPassword: string;
  textLogout: string;
  isLoadingLogout: boolean;
  errorLogout: string;
};

export type FetchAuthReturn = TokenFull & {
  user: Name & Email;
};
// export type FetchRegisterArg = {
//   user: User;
// };
export type FetchRegisterArg = User;
export type FetchLoginArg = Email & Password;

export type FetchAuthChangeReturn = Message;
export type FetchPasswordChangeArg = Email;
export type FetchPasswordResetArg = Password & Token;
export type FetchLogoutArg = Token;

// construcnorSlice
export type ConstructorState = {
  ingriedientsUser: Ingriedient[];
  isLoadingConstructor: boolean;
  errorMes: string;
};

//ingriedientsSlice
export type IngridientsState = {
  ingriedients: Ingriedient[];
  // ingridientCard: Ingriedient;
  isLoading: boolean;
  errorMes: string;
};

export type FetchIngriedientsReturn = { data: Ingriedient[] };

// modalSlice
export type ModalState = {
  modalDataCard: Ingriedient | OrderSocket;
};

// orderSlice
export type Order = {
  number?: number;
};

export type OrderState = {
  order: Order;
  isLoading: boolean;
  errorMes: string;
};

export type FetchOrderReturn = { order: Order } & { name: string };
export type FetchOrderArg = Ingriedient[];

// userSlice
export type UserState = {
  user: User | null;
  isLoadingGetUser: boolean;
  errorGetUser: string;
  isLoadingPatchUser: boolean;
  errorPatchUser: string;
};

export type FetchUserReturn = { user: Name & Email };
export type FetchUserArg = User;

// socketSlice
// export type MessageSocket = {
//   id: string;
//   text: string;
//   timestamp: number;
//   sender: string;
// };
export type OrderSocket = {
  _id: string;
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
};
export type MessageSocket = {
  _id: string;
  orders: OrderSocket[];
  success: boolean;
  total: number;
  totalToday: number;
};
export type MessagesSocket = MessageSocket[];
export type SocketState = {
  isConnected: boolean;
  messages: MessageSocket[];
  errorMesSocket: string | null;
  isLoadingSocket: boolean;
};

// export type FetchUserReturn = { user: Name & Email };
// export type FetchUserArg = User;
