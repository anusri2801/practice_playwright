import { expect, Locator, Page } from '@playwright/test';
import { RegistrationDetails } from '../dataTypes';

export class RegistrationPage {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly registerButton: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successHeading = page.getByRole('heading', { name: /^Welcome/ });
  }

  async open(targetUrl: string): Promise<void> {
    await this.page.goto(targetUrl);
  }

  async openRegistrationForm(): Promise<void> {
    await this.registerLink.click();
  }

  async register(user: RegistrationDetails): Promise<void> {
    await this.page.locator('#customer\\.firstName').fill(user.firstName);
    await this.page.locator('#customer\\.lastName').fill(user.lastName);
    await this.page.locator('#customer\\.address\\.street').fill(user.address);
    await this.page.locator('#customer\\.address\\.city').fill(user.city);
    await this.page.locator('#customer\\.address\\.state').fill(user.state);
    await this.page.locator('#customer\\.address\\.zipCode').fill(user.zipCode);
    await this.page.locator('#customer\\.phoneNumber').fill(user.phoneNumber);
    await this.page.locator('#customer\\.ssn').fill(user.ssn);
    await this.page.locator('#customer\\.username').fill(user.username);
    await this.page.locator('#customer\\.password').fill(user.password);
    await this.page.locator('#repeatedPassword').fill(user.password);
    await this.registerButton.click();
  }

  async expectRegistrationSuccess(username: string): Promise<void> {
    await expect(this.successHeading).toBeVisible();
    await expect(this.page.getByText(`Your account was created successfully. You are now logged in.`)).toBeVisible();
    await expect(this.page.getByText(username)).toBeVisible();
  }
}
