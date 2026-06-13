import { test, expect } from '@playwright/test';
// import * as fs from 'fs';
// import * as path from 'path';

const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWUyNDgxNDFjZmY1MDAxYjZlMjhjNiIsImlhdCI6MTc4MTM1MjIyNSwiZXhwIjoxNzgxMzUzNDI1fQ.wSvhX9ZiwKn4m-LZIcoLNOZ2YmoxZBCnIUUceU0cXVI';

test('example', async ({ page }) => {
  // console.log('TEST -> example');
  await page.goto('http://localhost:5173/react-burger/');
  await expect(page.getByText('Соберите бургер')).toBeVisible();
  // console.log('успешно');
});

test('наличие на странице нужных компонентов', async ({ page }) => {
  // console.log('TEST -> наличие на странице нужных компонентов');
  // 1. Открываем страницу
  await page.goto('/react-burger/');

  // 2. Убеждаемся, что мы на главной
  await expect(page.getByText('Соберите бургер')).toBeVisible();

  // 3. Ждём, пока страница загрузится (чтобы ингредиенты точно были в DOM)
  await page.waitForLoadState('networkidle');

  // 4. Находим ингредиенты в меню
  // Находим ингредиенты по тексту внутри <p>
  const bun = page.getByText('Краторная булка N-200i', { exact: true });
  const sauce = page.getByText('Соус Spicy-X', { exact: true });
  // оба элемента должны быть видимы в DOM
  await expect(bun).toBeVisible();
  await expect(sauce).toBeVisible();

  // 5. Находим кнопку по роли и тексту
  const orderButton = page.getByRole('button', { name: /Оформить заказ/i });
  // Проверяем, что кнопка вообще есть на странице
  await expect(orderButton).toBeVisible();
  // при нулевом заказе кнопка должна быть disabled:
  await expect(orderButton).toBeDisabled();
  // console.log('успешно');
});

test('модалка ингридиентов', async ({ page }) => {
  // console.log('TEST -> модалка ингридиентов');
  // 1. Открываем страницу
  await page.goto('/react-burger/');

  // 2. Убеждаемся, что мы на главной
  await expect(page.getByText('Соберите бургер')).toBeVisible();

  // 3. Ждём, пока страница загрузится (чтобы ингредиенты точно были в DOM)
  await page.waitForLoadState('networkidle');

  // 4. Находим ингредиенты в меню
  // Находим ингредиенты по тексту внутри <p>
  const bun = page.getByText('Краторная булка N-200i', { exact: true });
  const sauce = page.getByText('Соус Spicy-X', { exact: true });
  // оба элемента должны быть видимы в DOM
  await expect(bun).toBeVisible();
  await expect(sauce).toBeVisible();

  // --- ОТКРЫТИЕ МОДАЛКИ ---
  // Клик по ингредиенту (по булке)
  await bun.click();

  await page.waitForURL(/\/react-burger\/ingredients\/692889f16bf770001bfeb4cc$/, {
    timeout: 10000,
  });

  // 10. Проверки на странице ингридиента
  await expect(page).toHaveURL(/\/react-burger\/ingredients\/692889f16bf770001bfeb4cc$/);
  await expect(page.getByRole('dialog')).toBeVisible();

  // await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
  const modal = page.getByRole('dialog');
  // Проверяем, что внутри модалки есть название ингредиента (подтверждение, что открылась нужная)
  await expect(modal.getByText('Краторная булка N-200i')).toBeVisible();
  await expect(modal.getByText('420')).toBeVisible();
  await expect(modal.getByText('80')).toBeVisible();
  await expect(modal.getByText('24')).toBeVisible();
  await expect(modal.getByText('53')).toBeVisible();
  // --- ПРОВЕРКА КНОПКИ ЗАКРЫТИЯ ---

  // Ищем кнопку закрытия
  const closeButton = page.locator('#button_close');
  await expect(closeButton).toBeVisible();

  // --- ПРОВЕРКА ЗАКРЫТИЯ МОДАЛКИ ---
  // Кликаем по крестику
  await closeButton.click();

  // ждём возврата на главную (/)
  await page.waitForURL('/react-burger/', { timeout: 10000 });
  await expect(page).toHaveURL('/react-burger/');

  // ПРОВЕРКА: модалка больше не видна
  await expect(page.getByRole('dialog')).not.toBeVisible();

  // Финальная проверка: мы снова видим основной интерфейс (ингредиенты в меню)
  await expect(bun).toBeVisible();
  await expect(sauce).toBeVisible();
  // console.log('успешно');
});

// test('заполнение конструктора перетаскиванием, затем оформление заказа, проверка модалки заказа', async ({
//   page,
//   context,
// }) => {
//   // 1. Добавляем куки в контекст браузера ДО перехода на страницу
//   await context.addCookies([
//     {
//       name: 'accessToken',
//       value: TOKEN,
//       domain: 'localhost',
//       path: '/',
//     },
//   ]);
//   // 1. Делаем запрос на логин, чтобы получить настоящие куки от сервера
//   // const response = await context.request.post(
//   //   'https://new-stellarburgers.education-services.ru/api/auth/login',
//   //   {
//   //     data: {
//   //       email: 'alix1982@yandex.ru',
//   //       password: 'qqqqqq',
//   //     },
//   //   }
//   // );

//   // expect(response.status()).toBe(200); // убеждаемся, что логин успешен

//   // 2. Открываем страницу
//   await page.goto('http://localhost:5173/');

//   // 3. КРИТИЧЕСКАЯ ПРОВЕРКА: если всё ещё на /login — сразу падаем, не ждём таймаут
//   const url = page.url();
//   if (url.includes('/login')) {
//     throw new Error(
//       `Авторизация не сработала: приложение редиректит на /login. Текущий URL: ${url}`
//     );
//   }

//   // 3. Убеждаемся, что мы на главной и видим конструктор
//   await expect(page.getByText('Соберите бургер')).toBeVisible();

//   // // --- АВТОРИЗАЦИЯ ЧЕРЕЗ КУКИ (чтобы не редиректило на /login) ---
//   // await page.addInitScript(() => {
//   //   document.cookie = `accessToken=${TOKEN}; path=/; secure; samesite=strict`;
//   // });

//   // // Перезагружаем страницу, чтобы приложение увидело куки
//   // await page.reload();

//   // 4. Ждём, пока страница загрузится (чтобы ингредиенты точно были в DOM)
//   await page.waitForLoadState('networkidle');

//   // 5. Находим ингредиенты в меню и кнопку в конструкторе
//   // Находим ингредиенты по тексту внутри <p>
//   const bun = page.getByText('Краторная булка N-200i', { exact: true });
//   const sauce = page.getByText('Соус Spicy-X', { exact: true });
//   const orderButton = page.getByRole('button', { name: /Оформить заказ/i });
//   // ПРОВЕРКА: ингредиенты реально видны на странице
//   await expect(bun).toBeVisible();
//   await expect(sauce).toBeVisible();

//   // Проверяем состояние кнопки до добавления ингредиентов
//   await expect(orderButton).toBeVisible();
//   await expect(orderButton).toBeDisabled();

//   // 6. Перетаскиваем ингредиенты (если в приложении это именно drag-and-drop)
//   // Находим зону конструктора (куда перетаскиваем)
//   const constructorBun = page.locator('#burgerConstructorPoint').first();
//   const constructorIngriedient = page.locator('#burgerConstructorList');
//   await bun.dragTo(constructorBun);
//   await sauce.dragTo(constructorIngriedient);
//   // await ingredientMeat.dragTo(constructorArea);

//   // 7. Ждём, что ингредиенты реально появились в конструкторе
//   await expect(constructorBun).toContainText('Краторная булка N-200i');
//   await expect(constructorIngriedient).toContainText('Соус Spicy-X');

//   // 8. Проверяем, что кнопка стала активной (по логике она блокируется, пока нет ингредиентов)
//   await expect(orderButton).toBeEnabled();

//   // 10. --- НАЧАЛО ЗАПИСИ HAR ---
//   // Ловим все запросы, содержащие "/orders" в пути
//   await page.routeFromHAR('./e2e/hars/orders.har', {
//     url: '**/orders',
//     update: true, // false = перезаписать файл; true = дописать к существующему
//   });
//   // -------------------------
//   // 9. Сначала КЛИК, потом ожидание перехода (НЕ Promise.all!)
//   await orderButton.click();
//   await page.waitForURL(/\/order$/, { timeout: 10000 });

//   // 10. Проверки на странице заказа
//   await expect(page).toHaveURL(/\/order$/);
//   await expect(page.getByRole('dialog')).toBeVisible();

//   await expect(page.getByText('идентификатор заказа')).toBeVisible();
//   const closeButton = page.locator('#button_close');

//   // ПРОВЕРКА: кнопка закрытия существует и видима
//   await expect(closeButton).toBeVisible();

//   // Клик по кнопке закрытия
//   await closeButton.click();

//   // ПРОВЕРКА: ждём возврата на главную (/)
//   await page.waitForURL('/', { timeout: 10000 });
//   await expect(page).toHaveURL('/');

//   // ПРОВЕРКА: модалка больше не видна
//   await expect(page.getByRole('dialog')).not.toBeVisible();
// });

test('заполнение конструктора, с возможным редиректом на login после клика, оформление заказа', async ({
  page,
  context,
}) => {
  // console.log(
  //   'TEST -> заполнение конструктора, с возможным редиректом на login после клика, оформление заказа'
  // );
  // console.log(
  //   '>>> ЭТАП 1: Подготовка контекста и добавление куки (попытка тихого входа)'
  // );
  await context.addCookies([
    {
      name: 'accessToken',
      value: TOKEN,
      domain: 'localhost',
      path: '/',
    },
  ]);
  // console.log('>>> Куки добавлены. Текущий URL до перехода:', page.url());

  // 3. Открываем главную
  // console.log('>>> ЭТАП 2: Переход на главную страницу');
  await page.goto('http://localhost:5173/react-burger/');
  // console.log('>>> Страница загружена. Текущий URL:', page.url());

  // console.log('>>> ЭТАП 3: Проверка видимости ключевых элементов конструктора');
  const bun = page.getByText('Краторная булка N-200i', { exact: true });
  const sauce = page.getByText('Соус Spicy-X', { exact: true });
  const orderButton = page.getByRole('button', { name: /Оформить заказ/i });

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
  const constructorBun = page.locator('#burgerConstructorPoint').first();
  const constructorIngredient = page.locator('#burgerConstructorList');

  await bun.dragTo(constructorBun);
  // console.log('>>> Булка перетащена в конструктор');
  await sauce.dragTo(constructorIngredient);
  // console.log('>>> Соус перетащен в конструктор');

  await expect(constructorBun).toContainText('Краторная булка N-200i');
  // console.log('>>> Конструктор содержит булку');
  await expect(constructorIngredient).toContainText('Соус Spicy-X');
  // console.log('>>> Конструктор содержит соус');
  await expect(orderButton).toBeEnabled();
  // console.log('>>> Кнопка "Оформить заказ" теперь включена (корректно)');

  // 6. Включаем запись HAR (перед первым кликом)
  // console.log('>>> ЭТАП 5: Включение записи HAR для запросов к /orders');
  // await page.routeFromHAR('./e2e/hars/orders.har', {
  //   url: '**/orders',
  //   update: true,
  // });
  // console.log('>>> HAR-запись активирована');

  // 7. ПЕРВЫЙ КЛИК: оформляем заказ
  // console.log('>>> ЭТАП 6: Первый клик по кнопке "Оформить заказ"');
  await orderButton.click();
  await page.waitForLoadState('networkidle');
  // console.log('>>> После первого клика: текущий URL =', page.url());

  // 8. ПРОВЕРКА: если редирект на /login — выполняем вход через форму
  if (page.url().includes('/react-burger/login')) {
    // console.log(
    //   '>>> ЭТАП 7: Обнаружен редирект на /login. Начинаем процедуру автологина...'
    // );

    // --- Блок логина (селекторы по type="...") ---
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');

    await expect(emailInput).toBeVisible({ timeout: 5000 });
    // console.log('>>> Поле email найдено и видимо');
    await expect(passwordInput).toBeVisible({ timeout: 5000 });
    // console.log('>>> Поле password найдено и видимо');

    await emailInput.fill('alix1982@yandex.ru');
    // console.log('>>> Email заполнен');
    await passwordInput.fill('qqqqqq');
    // console.log('>>> Пароль заполнен');

    const loginButton = page.getByRole('button', { name: 'Войти' });
    await expect(loginButton).toBeVisible({ timeout: 5000 });
    // console.log('>>> Кнопка "Войти" найдена и видима');
    await loginButton.click();
    // console.log('>>> Клик по кнопке "Войти" выполнен');

    await page.waitForLoadState('networkidle');
    // console.log('>>> После логина: текущий URL =', page.url());

    // 9. ПОВТОРНЫЙ КЛИК: корзина сохраняется, просто кликаем «Оформить заказ» снова
    // console.log('>>> ЭТАП 8: Повторный клик по кнопке "Оформить заказ" после логина');
    const orderButtonRetry = page.getByRole('button', { name: /Оформить заказ/i });
    await expect(orderButtonRetry).toBeEnabled();
    await orderButtonRetry.click();
    // console.log('>>> Повторный клик выполнен. Ждём загрузки...');
    await page.waitForLoadState('networkidle');
    // console.log('>>> После повторного клика: текущий URL =', page.url());
  } else {
    // console.log(
    //   '>>> ЭТАП 7 (альтернатива): Редиректа на /login не было. Продолжаем без логина.'
    // );
  }

  // 10. ФИНАЛЬНЫЕ ПРОВЕРКИ
  console.log('>>> ЭТАП 9: Проверка перехода на страницу заказа (/order)');
  await expect(page).toHaveURL(/\/react-burger\/order$/, { timeout: 10000 });
  console.log('>>> Успешно перешли на /order. Текущий URL =', page.url());

  console.log('>>> ЭТАП 10: Проверка появления модального окна заказа');
  await expect(page.getByRole('dialog')).toBeVisible();
  console.log('>>> Модальное окно видно');
  await expect(page.getByText('идентификатор заказа')).toBeVisible();
  console.log('>>> Текст "идентификатор заказа" найден в модалке');

  const closeButton = page.locator('#button_close');
  await expect(closeButton).toBeVisible();
  // console.log('>>> Кнопка закрытия модалки найдена');
  await closeButton.click();
  // console.log('>>> Клик по кнопке закрытия модалки выполнен');

  // console.log(
  //   '>>> ЭТАП 11: Проверка возврата на главную страницу после закрытия модалки'
  // );
  await page.waitForURL('/react-burger/', { timeout: 10000 });
  await expect(page).toHaveURL('/react-burger/');
  // console.log('>>> Успешно вернулись на главную. Текущий URL =', page.url());
  await expect(page.getByRole('dialog')).not.toBeVisible();
  // console.log('>>> Модальное окно больше не видно (корректно)');

  console.log('>>> ТЕСТ ЗАВЕРШЁН УСПЕШНО');
});
