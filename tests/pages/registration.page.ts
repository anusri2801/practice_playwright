import { expect, Locator, Page } from '@playwright/test';
import { RegistrationDetails } from '../dataTypes';

export class RegistrationPage {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly registerButton: Locator;
  readonly successHeading: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly street: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phoneNumber: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly repeatedPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successHeading = page.getByRole('heading', { name: /^Welcome/ });
    this.firstName = page.locator('#customer\\.firstName');
    this.lastName = page.locator('#customer\\.lastName');
    this.street = page.locator('#customer\\.address\\.street')
    this.city = page.locator('#customer\\.address\\.city');
    this.state = page.locator('#customer\\.address\\.state');
    this.zipCode = page.locator('#customer\\.address\\.zipCode');
    this.phoneNumber = page.locator('#customer\\.phoneNumber');
    this.ssn = page.locator('#customer\\.ssn');
    this.username = page.locator('#customer\\.username');
    this.password = page.locator('#customer\\.password');
    this.repeatedPassword = page.locator('#repeatedPassword');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async openRegistrationForm(): Promise<void> {
    await this.registerLink.click();
  }

  async register(user: RegistrationDetails): Promise<void> {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.street.fill(user.address);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.zipCode.fill(user.zipCode);
    await this.phoneNumber.fill(user.phoneNumber);
    await this.ssn.fill(user.ssn);
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.repeatedPassword.fill(user.password);
    await this.registerButton.click();

  }

  async expectRegistrationSuccess(username: string): Promise<void> {
    await expect(this.successHeading).toBeVisible();
    await expect(this.page.getByText(`Your account was created successfully. You are now logged in.`)).toBeVisible();
    await expect(this.page.getByText(username)).toBeVisible();
  }
}
