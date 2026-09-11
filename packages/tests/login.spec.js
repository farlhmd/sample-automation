import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import config from '../../env.json';

test('Login Sample', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.verifyPageTitle();
  await loginPage.login(config.credentials.username, config.credentials.password);

  await dashboardPage.verifyLoginSuccess();
});
