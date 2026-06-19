import type {
  TestComponentIngriedient,
  TestComponentLogin,
  TestComponentMain,
  TestComponentOrder,
} from './types';

export const MAIN: TestComponentMain = {
  CONTENT: {
    TEXT: 'Соберите бургер',
    INGRIEDIENT_BUN: 'Краторная булка N-200i', // БУЛКА для dnd
    INGRIEDIENT_SAUCE: 'Соус Spicy-X', // ингридиент (не булка) для dnd
  },
  CONSTRUCTOR: {
    TAG_MAIN: '#main-constructor',
    TAG_SUBMIT: 'button',
    TEXT: /Оформить заказ/i,
  },
  URL_BASE: '/',
  URL_MAIN: '/react-burger/',
  DND_BUN: '#burgerConstructorPoint', // зона сброса при dnd для булки
  DND_LIST: '#burgerConstructorList', // зона сброса при dnd для ингридиента (не булки)
};

export const LOGIN: TestComponentLogin = {
  URL: '/react-burger/login',
  BUTTON_SUBMIT: {
    TAG_SUBMIT: 'button',
    TEXT: 'Войти',
  },
  INPUT_EMAIL: {
    TAG: 'input[type="email"]',
    VALUE: 'alix1982@yandex.ru',
  },
  INPUT_PASSWORD: {
    TAG: 'input[type="password"]',
    VALUE: 'qqqqqq',
  },
};

export const ORDER: TestComponentOrder = {
  URL: /\/react-burger\/order$/,
  TAG_MAIN: 'dialog',
  TAG_CLOSE: '#button_close',
  TEXT_ID: '5831',
  TEXT: 'идентификатор заказа',
};

export const INGRIEDIENT: TestComponentIngriedient = {
  URL: /\/react-burger\/ingredients\/692889f16bf770001bfeb4cd$/,
  TAG_MAIN: 'dialog',
  TAG_CLOSE: '#button_close',
  INGRIEDIENT_NAME: 'Флюоресцентная булка R2-D3', // ингридиент модалки должен быть в зоне видимости главного экрана
  CALORIES: '643',
  PROTEINS: '44',
  FAT: '26',
  CARBOHYDRATES: '85',
};

export const TEST_TIMEOUT = {
  BASE: 1000,
  SHORT: 5000,
};

// export const URLS = {
//   BASE: '/',
//   MAIN: '/react-burger/',
//   INGRIEDIENT: /\/react-burger\/ingredients\/692889f16bf770001bfeb4cc$/,
//   ORDER: /\/react-burger\/order$/,
//   LOGIN: '/react-burger/login',
// };
