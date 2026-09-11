import { expect } from '@playwright/test';

export class DashboardPage {
    constructor(page) {
        this.loginSuccessMessage = page.locator('#flash');
    }
    async verifyLoginSuccess() {
        await expect(this.loginSuccessMessage).toContainText('You logged into a secure area!');
    }
}