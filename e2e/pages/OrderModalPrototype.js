// Импорты (в JS не нужны type, просто берём всё)
import { expect } from '@playwright/test';

import { ORDER, TEST_TIMEOUT } from '../constant';

// Конструктор (работает как раньше, но без типизации)
export function OrderModalPrototype(page) {
  this.page = page;
  this.modal = page.getByRole(ORDER.TAG_MAIN);
  this.closeButton = page.locator(ORDER.TAG_CLOSE);
  this.orderIdText = page.getByText(ORDER.TEXT_ID);
  this.orderText = page.getByText(ORDER.TEXT);

  return this;
}

// Методы на прототипе
OrderModalPrototype.prototype.waitForReady = async function () {
  await this.page.waitForURL(ORDER.URL, { timeout: TEST_TIMEOUT.BASE });
  await expect(this.page).toHaveURL(ORDER.URL);
  await expect(this.modal).toBeVisible();
  await expect(this.orderIdText).toBeVisible();
  await expect(this.orderText).toBeVisible();
  await this.page.waitForLoadState('networkidle');
};

OrderModalPrototype.prototype.close = async function () {
  await expect(this.closeButton).toBeVisible();
  await this.closeButton.click();
  await expect(this.modal).not.toBeVisible({ timeout: TEST_TIMEOUT.SHORT });
};
