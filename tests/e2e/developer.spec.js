const { test, expect } = require('@playwright/test');
const { completeCommon } = require('./helpers');

test('工程師 Charles：學校欄位不出現', async ({ page }) => {
  await completeCommon(page, { firstname:'charles', email:'dev.charles@example.com', role:'developer', gender:'男', interests:['寫程式'] });
  await expect(page.getByLabel(/學校名稱/)).toBeHidden();
  await page.getByRole('button', { name:/提交表單/ }).click();
  await expect(page.getByRole('status')).toContainText('charles（工程師）');
});
