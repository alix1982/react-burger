// export type Tag = 'dialog' | 'button';

// export type InputConfig = {
//   tag: 'input[type="email"]' | 'input[type="password"]';
//   value: string;
// };

// export type ButtonConfig = {
//   tag: Tag;
//   text: RegExp | string;
// };

type TagTest = 'dialog' | 'button';
type InputTest = {
  TAG: 'input[type="email"]' | 'input[type="password"]';
  VALUE: string;
};
type ButtonTest = {
  TAG_SUBMIT: TagTest;
  TEXT: RegExp | string;
};
type Constructor = ButtonTest & {
  TAG_MAIN: string;
};

export type TestComponentMain = {
  CONTENT: {
    TEXT: string;
    INGRIEDIENT_BUN: string;
    INGRIEDIENT_SAUCE: string;
  };
  URL_BASE: string;
  URL_MAIN: string | RegExp;
  CONSTRUCTOR: Constructor;
  DND_BUN: string;
  DND_LIST: string;
};

export type TestComponentLogin = {
  URL: string;
  BUTTON_SUBMIT: ButtonTest;
  INPUT_EMAIL: InputTest;
  INPUT_PASSWORD: InputTest;
};

export type TestComponentOrder = {
  URL: string | RegExp;
  TAG_MAIN: TagTest;
  TAG_CLOSE: string;
  TEXT_ID: string;
  TEXT: string;
};

export type TestComponentIngriedient = {
  URL: string | RegExp;
  INGRIEDIENT_NAME: string;
  TAG_MAIN: TagTest;
  TAG_CLOSE: string;
  CALORIES: string;
  PROTEINS: string;
  FAT: string;
  CARBOHYDRATES: string;
};

// export const URLS = {
//   BASE: '/',
//   MAIN: '/react-burger/',
//   INGREDIENT: /\/react-burger\/ingredients\/692889f16bf770001bfeb4cd$/,
//   ORDER: /\/react-burger\/order$/,
//   LOGIN: '/react-burger/login',
// };

// export const TEST_TIMEOUT = {
//   BASE: 1000,
//   SHORT: 5000,
// };
