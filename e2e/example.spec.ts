import { test } from '@playwright/test';

import { LOGIN } from './constant';
import { IngredientModal } from './pages/IngredientModal';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { OrderModal } from './pages/OrderModal';
// import { OrderModalFn } from './pages/OrderModalFn';
// import { OrderModalPrototype } from './pages/OrderModalPrototype';

test('наличие на странице нужных компонентов', async ({ page }) => {
  const main = new MainPage(page);

  await main.goto();
  await main.waitForReady();
  await main.waitIngriedientsVisible();
  await main.checkInactiveOrderButton();
});

test('модалка ингредиентов', async ({ page }) => {
  const main = new MainPage(page);
  const ingredientModal = new IngredientModal(page);

  await main.goto();
  await main.waitForReady();
  await main.waitIngriedientsVisible();
  await main.clickIngridient();

  // Ждем появления модалки
  await ingredientModal.waitForReady();
  await ingredientModal.verifyContent();

  await ingredientModal.close();

  // Проверка возврата на главную
  await main.waitForReady();
  await main.waitIngriedientsVisible();
});

test('заполнение конструктора, оформление заказа (с возможным редиректом на login)', async ({
  page,
  context,
}, testInfo) => {
  const main = new MainPage(page);
  const login = new LoginPage(page);
  const orderModal = new OrderModal(page);
  // const modalOrderPrototype = new OrderModalPrototype(page);

  // Подготовка: куки (авторизация)
  await context.addCookies([
    {
      name: 'accessToken',
      value: 'super-secret-auth-token',
      domain: 'localhost',
      path: '/',
    },
  ]);

  await main.goto();
  await main.waitForReady();
  await main.waitIngriedientsVisible();
  await main.checkInactiveOrderButton();
  // Сборка бургера
  await main.dragIngredients();

  // Настройка HAR
  await page.routeFromHAR('./e2e/hars/orders.har', { url: '**/orders', update: false });
  await page.routeFromHAR('./e2e/hars/login.har', { url: '**/login', update: false });

  // Нажатие кнопки "Оформить заказ"
  await main.clickOrder();

  // ЛОГИКА РЕДИРЕКТА (проверка условия в тесте)
  if (page.url().includes(LOGIN.URL)) {
    // console.log('>>> Обнаружен редирект на страницу логина');
    await login.waitForReady();

    // Действие: логинимся
    await login.fillLoginForm(LOGIN.INPUT_EMAIL.VALUE, LOGIN.INPUT_PASSWORD.VALUE);
    await login.submitLoginForm();
    // Повторное нажатие кнопки "Оформить заказ"
    await main.clickOrder();
  }

  // Проверка перехода на страницу заказа
  await orderModal.waitForReady();
  // await OrderModalFn(page).waitForReady();
  // await modalOrderPrototype.waitForReady();

  // Ручной скриншот модалки заказа
  await page.screenshot({
    path: `debug-${testInfo.project.name}-order-modal.png`,
  });

  // Закрываем модалку
  await orderModal.close();
  // await OrderModalFn(page).close();
  // await modalOrderPrototype.close();

  // Финальная проверка возврата на главную
  await main.waitForReady();
});
