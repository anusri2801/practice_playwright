import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { RegistrationPage } from './pages/registration.page';

// Declare TypeScript types for your custom fixtures
type Fixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
};

// Extend the base test object
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  }
});
