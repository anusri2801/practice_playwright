import { test } from '../fixtures';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RegisteredUser } from '../dataTypes';


const environment = process.env.TEST_ENV ?? 'sit';

const registeredUser = JSON.parse(
  readFileSync(resolve(process.cwd(), 'tests', 'testdata', environment, 'registeredUser.json'), 'utf-8'),
) as RegisteredUser;

test.describe('Customer login', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('AC-01: logs in successfully with valid credentials', async ({ loginPage }) => {
    await loginPage.login(registeredUser.username, registeredUser.password);
    await loginPage.expectLoginSuccess();
  });

  test('AC-02: rejects invalid credentials with an authentication message', async ({ loginPage }) => {
    await loginPage.login(`${registeredUser.username}-invalid`, registeredUser.password);
    await loginPage.expectAuthenticationError();
  });

  test('AC-03: rejects an empty username', async ({ loginPage }) => {
    await loginPage.login('', registeredUser.password);
    await loginPage.expectAuthenticationError();
  });
});