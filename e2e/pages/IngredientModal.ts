import { type Page, type Locator, expect } from '@playwright/test';

import { INGRIEDIENT, TEST_TIMEOUT } from '../constant';

// import { TEST_TIMEOUT, URLS } from 'e2e/types';

export class IngredientModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly closeButton: Locator;
  readonly ingridientText: Locator;
  readonly caloriesText: Locator;
  readonly proteinsText: Locator;
  readonly fatText: Locator;
  readonly carbsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.getByRole(INGRIEDIENT.TAG_MAIN);
    this.closeButton = this.modal.locator(INGRIEDIENT.TAG_CLOSE);

    this.ingridientText = this.modal.getByText(INGRIEDIENT.INGRIEDIENT_NAME);
    this.caloriesText = this.modal.getByText(INGRIEDIENT.CALORIES);
    this.proteinsText = this.modal.getByText(INGRIEDIENT.PROTEINS);
    this.fatText = this.modal.getByText(INGRIEDIENT.FAT);
    this.carbsText = this.modal.getByText(INGRIEDIENT.CARBOHYDRATES);
  }

  async waitForReady(): Promise<void> {
    await this.page.waitForURL(INGRIEDIENT.URL, { timeout: TEST_TIMEOUT.BASE });
    await expect(this.page).toHaveURL(INGRIEDIENT.URL);
    await expect(this.modal).toBeVisible();
    // await this.titleText.waitFor({ state: 'visible' });
  }

  async verifyContent(): Promise<void> {
    await expect(this.ingridientText).toBeVisible();
    await expect(this.caloriesText).toBeVisible();
    await expect(this.proteinsText).toBeVisible();
    await expect(this.fatText).toBeVisible();
    await expect(this.carbsText).toBeVisible();
  }

  async close(): Promise<void> {
    await expect(this.closeButton).toBeVisible();
    // await this.closeButton.waitFor({ state: 'visible' });
    await this.closeButton.click();
    await expect(this.modal).not.toBeVisible({ timeout: TEST_TIMEOUT.SHORT });
    // await this.modal.waitFor({ state: 'hidden' });
  }
}
