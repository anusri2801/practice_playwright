import { test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { LoginPage } from '../pages/login.page';
import { RegistrationPage } from '../pages/registration.page';
import { RegisteredUser} from '../dataTypes';
import { createRegistrationDetails, RegistrationFixture } from '../utilities/registrationData';



const environment = process.env.TEST_ENV ?? 'sit';
const registeredUser = JSON.parse(
  readFileSync(resolve(process.cwd(), 'tests', 'testdata', environment, 'registeredUser.json'), 'utf-8'),
) as RegisteredUser;
const registrationFixture = JSON.parse(
  readFileSync(resolve(process.cwd(), 'tests', 'testdata', environment, 'userRegistration.json'), 'utf-8'),
) as RegistrationFixture;

const targetUrl = 'https://parabank.parasoft.com/parabank/index.htm';

test.describe('Customer login', () => {
  test('AC-01: logs in successfully with valid credentials', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const user = createRegistrationDetails(registrationFixture);

    await registrationPage.open(targetUrl);
    await registrationPage.openRegistrationForm();
    await registrationPage.register(user);
    await registrationPage.expectRegistrationSuccess(user.username);

    await page.getByRole('link', { name: 'Log Out' }).click();
    const loginPage = new LoginPage(page);

    await loginPage.open(targetUrl);
    await loginPage.login(user.username, user.password);
    await loginPage.expectLoginSuccess();
  });

  test('AC-02: rejects invalid credentials with an authentication message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open(targetUrl);
    await loginPage.login(`${registeredUser.username}-invalid`, registeredUser.password);
    await loginPage.expectAuthenticationError();
  });

  test('AC-03: rejects an empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open(targetUrl);
    await loginPage.login('', registeredUser.password);
    await loginPage.expectAuthenticationError();
  });
});