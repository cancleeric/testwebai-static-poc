const { test, expect } = require('@playwright/test');
const { completeCommon } = require('./helpers');

test('設計師 David：支援多選興趣', async ({ page }) => {
  await completeCommon(page, { firstname:'david', email:'designer.d@example.com', role:'designer', gender:'男', interests:['打電動','看電影'] });
  await expect(page.getByLabel('打電動')).toBeChecked();
  await expect(page.getByLabel('看電影')).toBeChecked();
  await page.getByRole('button', { name:/提交表單/ }).click();
  await expect(page.getByRole('status')).toContainText('david（設計師）');
});
