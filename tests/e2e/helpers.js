async function completeCommon(page, data) {
  await page.goto('/');
  await page.getByLabel(/First Name/).fill(data.firstname);
  await page.getByLabel(/E-Mail/).fill(data.email);
  await page.getByLabel(/身分角色/).selectOption(data.role);
  await page.getByRole('radio', { name: data.gender, exact: true }).check();
  for (const interest of data.interests) {
    await page.getByRole('checkbox', { name: interest, exact: true }).check();
  }
}

module.exports = { completeCommon };
