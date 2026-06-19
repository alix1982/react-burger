import { type Page, type Locator, expect } from '@playwright/test';

import { INGRIEDIENT, MAIN, TEST_TIMEOUT } from '../constant';

// import { URLS } from '../types';

export class MainPage {
  readonly page: Page;

  readonly titleText: Locator;
  readonly bunDNDText: Locator;
  readonly ingriedientDNDText: Locator;
  readonly ingriedientButton: Locator;
  readonly sectionConstructor: Locator;
  readonly orderButton: Locator;
  readonly dndBun: Locator;
  readonly dndList: Locator;
  // readonly constructorBun: Locator;
  // readonly constructorIngredient: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleText = page.getByText(MAIN.CONTENT.TEXT, { exact: true });
    this.bunDNDText = page.getByText(MAIN.CONTENT.INGRIEDIENT_BUN, { exact: true });
    this.ingriedientDNDText = page.getByText(MAIN.CONTENT.INGRIEDIENT_SAUCE, {
      exact: true,
    });
    this.ingriedientButton = page.getByText(INGRIEDIENT.INGRIEDIENT_NAME, {
      exact: true,
    });
    this.sectionConstructor = page.locator(MAIN.CONSTRUCTOR.TAG_MAIN);
    this.orderButton = this.sectionConstructor.getByRole(MAIN.CONSTRUCTOR.TAG_SUBMIT, {
      name: MAIN.CONSTRUCTOR.TEXT,
    });
    this.dndBun = this.sectionConstructor.locator(MAIN.DND_BUN).first();
    this.dndList = this.sectionConstructor.locator(MAIN.DND_LIST);
    // this.constructorBun = this.sectionConstructor
    //   .locator('Краторная булка N-200i')
    //   .first();
    // this.constructorIngredient = this.sectionConstructor.locator('Соус Spicy-X');
  }

  async goto(): Promise<void> {
    await this.page.goto(MAIN.URL_BASE);
  }

  // Просто ждём появления заголовка и загрузки сети.
  async waitForReady(): Promise<void> {
    // console.log(this.page.url());
    await this.page.waitForURL(MAIN.URL_MAIN, { timeout: TEST_TIMEOUT.BASE });
    await expect(this.page).toHaveURL(MAIN.URL_MAIN);
    await expect(this.titleText).toBeVisible();
    // await this.titleText.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }
  async waitIngriedientsVisible(): Promise<void> {
    await expect(this.bunDNDText).toBeVisible();
    await expect(this.ingriedientDNDText).toBeVisible();
    // await this.bunText.waitFor({ state: 'visible' });
    // await this.sauceText.waitFor({ state: 'visible' });
  }
  async checkInactiveOrderButton(): Promise<void> {
    await expect(this.orderButton).toBeVisible();
    await expect(this.orderButton).toBeDisabled();
  }
  async dragIngredients(): Promise<void> {
    await this.bunDNDText.dragTo(this.dndBun);
    await this.ingriedientDNDText.dragTo(this.dndList);
    await expect(this.dndBun).toContainText(MAIN.CONTENT.INGRIEDIENT_BUN);
    // console.log('>>> Конструктор содержит булку');
    await expect(this.dndList).toContainText(MAIN.CONTENT.INGRIEDIENT_SAUCE);
    // console.log('>>> Конструктор содержит соус');
    await expect(this.orderButton).toBeEnabled();
    // Здесь тоже не делаем expect — возвращаем управление тесту, он проверит результат
  }

  async clickIngridient(): Promise<void> {
    await this.ingriedientButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickOrder(): Promise<void> {
    await expect(this.orderButton).toBeEnabled();
    await this.orderButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
