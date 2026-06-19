import { test, expect } from '@playwright/test';
// import * as fs from 'fs';
// import * as path from 'path';
type Tag = 'dialog' | 'button';
type Input = {
  TAG: 'input[type="email"]' | 'input[type="password"]';
  VALUE: string;
};
type Button = {
  TAG: Tag;
  TEXT: RegExp | string;
};

type TestComponent = {
  MAIN: {
    CONTENT: {
      TEXT: string;
      INGRIEDIENT_BUN: string;
      INGRIEDIENT_SAUCE: string;
    };
    BUTTON: Button;
    DND_BUN: string; // селектор
    DND_LIST: string; // селектор
  };
  LOGIN: {
    BUTTON_SUBMIT: Button;
    INPUT_EMAIL: Input;
    INPUT_PASSWORD: Input;
  };
  ORDER: {
    TAG_MAIN: Tag;
    TAG_CLOSE: string;
    TEXT_ID: string;
    TEXT: string;
    CALORIES: string;
    PROTEINS: string;
    FAT: string;
    CARBOHYDRATES: string;
  };
  INGRIEDIENT: {
    TAG_MAIN: Tag;
    TAG_CLOSE: string;
  };
};
// const TEST_INGRIEDIENT_BUN = 'Краторная булка N-200i';
// const TEST_INGRIEDIENT_SAUCE = 'Соус Spicy-X';
// const TEST_TEXT_MAIN = 'Соберите бургер';
// const TEST_COMPONENT_DIALOG = 'dialog';
const TEST_COMPONENT: TestComponent = {
  MAIN: {
    CONTENT: {
      TEXT: 'Соберите бургер',
      INGRIEDIENT_BUN: 'Краторная булка N-200i',
      INGRIEDIENT_SAUCE: 'Соус Spicy-X',
    },
    BUTTON: {
      TAG: 'button',
      TEXT: /Оформить заказ/i,
    },
    DND_BUN: '#burgerConstructorPoint',
    DND_LIST: '#burgerConstructorList',
  },
  LOGIN: {
    BUTTON_SUBMIT: {
      TAG: 'button',
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
  },
  ORDER: {
    TAG_MAIN: 'dialog',
    TAG_CLOSE: '#button_close',
    TEXT_ID: '5831',
    TEXT: 'идентификатор заказа',
    CALORIES: '420',
    PROTEINS: '80',
    FAT: '24',
    CARBOHYDRATES: '53',
  },
  INGRIEDIENT: {
    TAG_MAIN: 'dialog',
    TAG_CLOSE: '#button_close',
  },
};

const URL = {
  BASE: '/',
  MAIN: '/react-burger/',
  INGRIEDIENT: /\/react-burger\/ingredients\/692889f16bf770001bfeb4cc$/,
  ORDER: /\/react-burger\/order$/,
  LOGIN: '/react-burger/login',
};

const TEST_TIMEOUT = {
  BASE: 1000,
  SHORT: 5000,
};

// const TOKEN =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWUyNDgxNDFjZmY1MDAxYjZlMjhjNiIsImlhdCI6MTc4MTQyNjk0MCwiZXhwIjoxNzgxNDI4MTQwfQ.kcRNWDX_77PscGwJCHqovtSDObv8Rt_Ty1FEErKKcFo';

test('example', async ({ page }) => {
  // console.log('TEST -> example');
  await page.goto(URL.BASE);
  await expect(page.getByText(TEST_COMPONENT.MAIN.CONTENT.TEXT)).toBeVisible();
  // console.log('успешно');
});

test('наличие на странице нужных компонентов', async ({ page }) => {
  // console.log('TEST -> наличие на странице нужных компонентов');
  // 1. Открываем страницу
  await page.goto(URL.BASE);

  // 2. Убеждаемся, что мы на главной
  await expect(page.getByText(TEST_COMPONENT.MAIN.CONTENT.TEXT)).toBeVisible();

  // 3. Ждём, пока страница загрузится (чтобы ингредиенты точно были в DOM)
  await page.waitForLoadState('networkidle');

  // 4. Находим ингредиенты в меню
  // Находим ингредиенты по тексту внутри <p>
  const bun = page.getByText(TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_BUN, {
    exact: true,
  });
  const sauce = page.getByText(TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_SAUCE, {
    exact: true,
  });
  // оба элемента должны быть видимы в DOM
  await expect(bun).toBeVisible();
  await expect(sauce).toBeVisible();

  // 5. Находим кнопку по роли и тексту
  const orderButton = page.getByRole(TEST_COMPONENT.MAIN.BUTTON.TAG, {
    name: TEST_COMPONENT.MAIN.BUTTON.TEXT,
  });
  // Проверяем, что кнопка вообще есть на странице
  await expect(orderButton).toBeVisible();
  // при нулевом заказе кнопка должна быть disabled:
  await expect(orderButton).toBeDisabled();
  // console.log('успешно');
});

test('модалка ингридиентов', async ({ page }) => {
  // console.log('TEST -> модалка ингридиентов');
  // 1. Открываем страницу
  await page.goto(URL.BASE);

  // 2. Убеждаемся, что мы на главной
  await expect(page.getByText(TEST_COMPONENT.MAIN.CONTENT.TEXT)).toBeVisible();

  // 3. Ждём, пока страница загрузится (чтобы ингредиенты точно были в DOM)
  await page.waitForLoadState('networkidle');

  // 4. Находим ингредиенты в меню
  // Находим ингредиенты по тексту внутри <p>
  const bun = page.getByText(TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_BUN, {
    exact: true,
  });
  const sauce = page.getByText(TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_SAUCE, {
    exact: true,
  });
  // оба элемента должны быть видимы в DOM
  await expect(bun).toBeVisible();
  await expect(sauce).toBeVisible();

  // --- ОТКРЫТИЕ МОДАЛКИ ---
  // Клик по ингредиенту (по булке)
  await bun.click();

  await page.waitForURL(URL.INGRIEDIENT, {
    timeout: TEST_TIMEOUT.BASE,
  });

  // 10. Проверки на странице ингридиента
  await expect(page).toHaveURL(URL.INGRIEDIENT);
  await expect(page.getByRole(TEST_COMPONENT.INGRIEDIENT.TAG_MAIN)).toBeVisible();

  // await expect(page.getByRole(TEST_COMPONENT_DIALOG)).toBeVisible({ timeout: TEST_TIMEOUT.BASE });
  const modal = page.getByRole(TEST_COMPONENT.INGRIEDIENT.TAG_MAIN);
  // Проверяем, что внутри модалки есть название ингредиента (подтверждение, что открылась нужная)
  await expect(
    modal.getByText(TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_BUN)
  ).toBeVisible();
  await expect(modal.getByText(TEST_COMPONENT.ORDER.CALORIES)).toBeVisible();
  await expect(modal.getByText(TEST_COMPONENT.ORDER.PROTEINS)).toBeVisible();
  await expect(modal.getByText(TEST_COMPONENT.ORDER.FAT)).toBeVisible();
  await expect(modal.getByText(TEST_COMPONENT.ORDER.CARBOHYDRATES)).toBeVisible();
  // --- ПРОВЕРКА КНОПКИ ЗАКРЫТИЯ ---

  // Ищем кнопку закрытия
  const closeButton = page.locator(TEST_COMPONENT.INGRIEDIENT.TAG_CLOSE);
  await expect(closeButton).toBeVisible();

  // --- ПРОВЕРКА ЗАКРЫТИЯ МОДАЛКИ ---
  // Кликаем по крестику
  await closeButton.click();

  // ждём возврата на главную (/)
  await page.waitForURL(URL.MAIN, { timeout: TEST_TIMEOUT.BASE });
  await expect(page).toHaveURL(URL.MAIN);

  // ПРОВЕРКА: модалка больше не видна
  await expect(page.getByRole(TEST_COMPONENT.INGRIEDIENT.TAG_MAIN)).not.toBeVisible();

  // Финальная проверка: мы снова видим основной интерфейс (ингредиенты в меню)
  await expect(bun).toBeVisible();
  await expect(sauce).toBeVisible();
  // console.log('успешно');
});

test('заполнение конструктора, с возможным редиректом на login после клика, оформление заказа', async ({
  page,
  context,
}, testInfo) => {
  // console.log(
  //   'TEST -> заполнение конструктора, с возможным редиректом на login после клика, оформление заказа'
  // );
  // console.log(
  //   '>>> ЭТАП 1: Подготовка контекста и добавление куки (попытка тихого входа)'
  // );
  await context.addCookies([
    {
      name: 'accessToken',
      value: 'super-secret-auth-token',
      domain: 'localhost',
      path: '/',
    },
  ]);
  // console.log('>>> Куки добавлены. Текущий URL до перехода:', page.url());

  // 3. Открываем главную
  // console.log('>>> ЭТАП 2: Переход на главную страницу');
  await page.goto(URL.BASE);
  // console.log('>>> Страница загружена. Текущий URL:', page.url());

  // console.log('>>> ЭТАП 3: Проверка видимости ключевых элементов конструктора');
  const bun = page.getByText(TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_BUN, {
    exact: true,
  });
  const sauce = page.getByText(TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_SAUCE, {
    exact: true,
  });
  const orderButton = page.getByRole(TEST_COMPONENT.MAIN.BUTTON.TAG, {
    name: TEST_COMPONENT.MAIN.BUTTON.TEXT,
  });

  await expect(bun).toBeVisible();
  // console.log('>>> Ингредиент "булка" найден и виден');
  await expect(sauce).toBeVisible();
  // console.log('>>> Ингредиент "соус" найден и виден');
  await expect(orderButton).toBeVisible();
  // console.log('>>> Кнопка "Оформить заказ" найдена и видна');
  await expect(orderButton).toBeDisabled();
  // console.log('>>> Кнопка "Оформить заказ" изначально отключена (корректно)');

  // 5. Перетаскиваем ингредиенты
  // console.log('>>> ЭТАП 4: Перетаскивание ингредиентов в конструктор');
  const constructorBun = page.locator(TEST_COMPONENT.MAIN.DND_BUN).first();
  const constructorIngredient = page.locator(TEST_COMPONENT.MAIN.DND_LIST);

  await bun.dragTo(constructorBun);
  // console.log('>>> Булка перетащена в конструктор');
  await sauce.dragTo(constructorIngredient);
  // console.log('>>> Соус перетащен в конструктор');

  await expect(constructorBun).toContainText(
    TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_BUN
  );
  // console.log('>>> Конструктор содержит булку');
  await expect(constructorIngredient).toContainText(
    TEST_COMPONENT.MAIN.CONTENT.INGRIEDIENT_SAUCE
  );
  // console.log('>>> Конструктор содержит соус');
  await expect(orderButton).toBeEnabled();
  // console.log('>>> Кнопка "Оформить заказ" теперь включена (корректно)');

  // 6. Включаем запись HAR (перед первым кликом)
  // console.log('>>> ЭТАП 5: Включение записи HAR для запросов к /orders и к /login');
  await page.routeFromHAR('./e2e/hars/orders.har', {
    url: '**/orders',
    update: false,
  });
  await page.routeFromHAR('./e2e/hars/login.har', {
    url: '**/login',
    update: false,
  });
  // console.log('>>> HAR-записи активированы');

  // 7. ПЕРВЫЙ КЛИК: оформляем заказ
  // console.log('>>> ЭТАП 6: Первый клик по кнопке "Оформить заказ"');
  await orderButton.click();
  await page.waitForLoadState('networkidle');
  // console.log('>>> После первого клика: текущий URL =', page.url());

  // 8. ПРОВЕРКА: если редирект на /login — выполняем вход через форму
  if (page.url().includes(URL.LOGIN)) {
    // console.log(
    //   '>>> ЭТАП 7: Обнаружен редирект на /login. Начинаем процедуру автологина...'
    // );

    // --- Блок логина (селекторы по type="...") ---
    const emailInput = page.locator(TEST_COMPONENT.LOGIN.INPUT_EMAIL.TAG);
    const passwordInput = page.locator(TEST_COMPONENT.LOGIN.INPUT_PASSWORD.TAG);

    await expect(emailInput).toBeVisible({ timeout: TEST_TIMEOUT.SHORT });
    // console.log('>>> Поле email найдено и видимо');
    await expect(passwordInput).toBeVisible({ timeout: TEST_TIMEOUT.SHORT });
    // console.log('>>> Поле password найдено и видимо');

    await emailInput.fill(TEST_COMPONENT.LOGIN.INPUT_EMAIL.VALUE);
    // console.log('>>> Email заполнен');
    await passwordInput.fill(TEST_COMPONENT.LOGIN.INPUT_PASSWORD.VALUE);
    // console.log('>>> Пароль заполнен');

    const loginButton = page.getByRole(TEST_COMPONENT.LOGIN.BUTTON_SUBMIT.TAG, {
      name: TEST_COMPONENT.LOGIN.BUTTON_SUBMIT.TEXT,
    });
    await expect(loginButton).toBeVisible({ timeout: TEST_TIMEOUT.SHORT });
    // console.log('>>> Кнопка "Войти" найдена и видима');
    await loginButton.click();
    // console.log('>>> Клик по кнопке "Войти" выполнен');
    await page.waitForLoadState('networkidle');
    // console.log('>>> После логина: текущий URL =', page.url());

    // 9. ПОВТОРНЫЙ КЛИК: корзина сохраняется, просто кликаем «Оформить заказ» снова
    // console.log('>>> ЭТАП 8: Повторный клик по кнопке "Оформить заказ" после логина');
    await expect(orderButton).toBeEnabled();
    await orderButton.click();
    // console.log('>>> Повторный клик выполнен. Ждём загрузки...');
    await page.waitForLoadState('networkidle');
    // await page.waitForTimeout(TEST_TIMEOUT.SHORT);
    // console.log('>>> После повторного клика: текущий URL =', page.url());
  } else {
    // console.log(
    //   '>>> ЭТАП 7 (альтернатива): Редиректа на /login не было. Продолжаем без логина.'
    // );
  }

  // 10. ФИНАЛЬНЫЕ ПРОВЕРКИ
  // console.log('>>> ЭТАП 9: Проверка перехода на страницу заказа (/order)');
  await expect(page).toHaveURL(URL.ORDER, { timeout: TEST_TIMEOUT.BASE });
  // console.log('>>> Успешно перешли на /order. Текущий URL =', page.url());

  // console.log('>>> ЭТАП 10: Проверка появления модального окна заказа');
  await expect(page.getByRole(TEST_COMPONENT.ORDER.TAG_MAIN)).toBeVisible();
  await page.screenshot({
    path: `debug-${testInfo.project.name}-${TEST_COMPONENT.ORDER.TAG_MAIN}-order.png`,
  });

  // console.log('>>> Модальное окно видно');
  await expect(page.getByText(TEST_COMPONENT.ORDER.TEXT_ID)).toBeVisible();
  // console.log('>>> Мокирование запроса заказа работает');
  await expect(page.getByText(TEST_COMPONENT.ORDER.TEXT)).toBeVisible();
  // console.log('>>> Текст "идентификатор заказа" найден в модалке');

  const closeButtonOrder = page.locator(TEST_COMPONENT.ORDER.TAG_CLOSE);
  await expect(closeButtonOrder).toBeVisible();
  // console.log('>>> Кнопка закрытия модалки найдена');
  await closeButtonOrder.click();
  // console.log('>>> Клик по кнопке закрытия модалки выполнен');
  // }

  // console.log(
  //   '>>> ЭТАП 11: Проверка возврата на главную страницу после закрытия модалки'
  // );
  await page.waitForURL(URL.MAIN, { timeout: TEST_TIMEOUT.BASE });
  await expect(page).toHaveURL(URL.MAIN);
  // console.log('>>> Успешно вернулись на главную. Текущий URL =', page.url());
  await expect(page.getByRole(TEST_COMPONENT.ORDER.TAG_MAIN)).not.toBeVisible();
  // console.log('>>> Модальное окно больше не видно (корректно)');

  console.log('>>> ТЕСТ ЗАВЕРШЁН УСПЕШНО');
});
