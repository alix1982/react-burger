import { type Page, expect } from '@playwright/test';

import { ORDER, TEST_TIMEOUT } from '../constant';

export const OrderModalFn = (
  page: Page
): { waitForReady: () => Promise<void>; close: () => Promise<void> } => {
  const modal = page.getByRole(ORDER.TAG_MAIN);
  const closeButton = page.locator(ORDER.TAG_CLOSE);
  const orderIdText = page.getByText(ORDER.TEXT_ID);
  const orderText = page.getByText(ORDER.TEXT);
  // }

  const waitForReady = async (): Promise<void> => {
    await page.waitForURL(ORDER.URL, { timeout: TEST_TIMEOUT.BASE });
    await expect(page).toHaveURL(ORDER.URL);
    await expect(modal).toBeVisible();
    await expect(orderIdText).toBeVisible();
    await expect(orderText).toBeVisible();
    await page.waitForLoadState('networkidle');
  };

  const close = async (): Promise<void> => {
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(modal).not.toBeVisible({ timeout: TEST_TIMEOUT.SHORT });
  };

  return { waitForReady, close };
};
