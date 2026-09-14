const { test, expect } = require('@playwright/test');
const { completeCommon } = require('./helpers');

test('學生 Apple：顯示並驗證學校欄位', async ({ page }) => {
  await completeCommon(page, { firstname:'apple', email:'test@example.com', role:'student', gender:'女', interests:['看電影'] });
  await expect(page.getByLabel(/學校名稱/)).toBeVisible();
  await page.getByLabel(/學校名稱/).fill('台灣大學');
  await page.getByRole('button', { name:/提交表單/ }).click();
  await expect(page.getByRole('status')).toContainText('apple（學生）');
});
