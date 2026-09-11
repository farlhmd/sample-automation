import { expect } from '@playwright/test';
import config from '../../env.json';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.headingLocator = page.locator('h2');
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto(`${config.baseUrl}/login`);
  }
  async verifyPageTitle() {
    await expect(this.headingLocator).toContainText('Login Page');
  }
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    const authenticatePromise = this.page.waitForResponse(
      response => response.url().includes('/authenticate') && response.status() === 303
    );
    const securePromise = this.page.waitForResponse(
      response => response.url().includes('/secure') && response.status() === 200
    );

    await this.loginButton.click();

    await authenticatePromise;
    await securePromise;
  }
}