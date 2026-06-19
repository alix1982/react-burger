import { type Page, type Locator, expect } from '@playwright/test';

import { ORDER, TEST_TIMEOUT } from '../constant';

export class OrderModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly closeButton: Locator;
  readonly orderIdText: Locator;
  readonly orderText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.getByRole(ORDER.TAG_MAIN);
    this.closeButton = page.locator(ORDER.TAG_CLOSE);
    this.orderIdText = page.getByText(ORDER.TEXT_ID);
    this.orderText = page.getByText(ORDER.TEXT);
  }

  async waitForReady(): Promise<void> {
    await this.page.waitForURL(ORDER.URL, { timeout: TEST_TIMEOUT.BASE });
    await expect(this.page).toHaveURL(ORDER.URL);
    await expect(this.modal).toBeVisible();
    await expect(this.orderIdText).toBeVisible();
    await expect(this.orderText).toBeVisible();
    await this.page.waitForLoadState('networkidle');
  }

  async close(): Promise<void> {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
    await expect(this.modal).not.toBeVisible({ timeout: TEST_TIMEOUT.SHORT });
  }
}
