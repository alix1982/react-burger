import { type Page, type Locator, expect } from '@playwright/test';

import { LOGIN, TEST_TIMEOUT } from '../constant';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(LOGIN.INPUT_EMAIL.TAG);
    this.passwordInput = page.locator(LOGIN.INPUT_PASSWORD.TAG);
    this.submitButton = page.getByRole(LOGIN.BUTTON_SUBMIT.TAG_SUBMIT, {
      name: LOGIN.BUTTON_SUBMIT.TEXT,
    });
  }

  async waitForReady(): Promise<void> {
    await this.page.waitForURL(LOGIN.URL, { timeout: TEST_TIMEOUT.BASE });
    await expect(this.page).toHaveURL(LOGIN.URL);
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await this.page.waitForLoadState('networkidle');
  }

  // async isVisible(): Promise<boolean> {
  //   return await this.emailInput
  //     .isVisible({ timeout: TEST_TIMEOUT.SHORT })
  //     .catch(() => false);
  // }

  // Заполняет форму
  async fillLoginForm(email: string, password: string): Promise<void> {
    // Ждём, пока поля станут видимыми (это часть действия, а не проверка теста)
    await this.emailInput.waitFor({ state: 'visible', timeout: TEST_TIMEOUT.BASE });
    await this.passwordInput.waitFor({ state: 'visible', timeout: TEST_TIMEOUT.BASE });

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  // отправляет форму
  async submitLoginForm(): Promise<void> {
    await this.submitButton.click();
    // Ждём завершения навигации после отправки формы
    await this.page.waitForLoadState('networkidle');
  }
}
