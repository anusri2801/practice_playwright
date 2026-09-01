import { test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RegistrationPage } from '../pages/registration.page';
import { createRegistrationDetails, RegistrationFixture, saveRegisteredUser } from '../utilities/registrationData';

const environment = process.env.TEST_ENV ?? 'sit';
const registrationFixture = JSON.parse(
  readFileSync(resolve(process.cwd(), 'tests', 'testdata', environment, 'userRegistration.json'), 'utf-8'),
) as RegistrationFixture;

const targetUrl = 'https://parabank.parasoft.com/parabank/index.htm';

test('registers a new user successfully', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const user = createRegistrationDetails(registrationFixture);

  await registrationPage.open(targetUrl);
  await registrationPage.openRegistrationForm();
  await registrationPage.register(user);
  await registrationPage.expectRegistrationSuccess(user.username);
  saveRegisteredUser(environment, user);
});
