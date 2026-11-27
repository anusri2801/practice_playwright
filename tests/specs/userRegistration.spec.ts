import { test } from '../fixtures';
import { saveRegisteredUser } from '../utilities/registrationData';
import { generateRandomUser } from '../utilities/randomUserGenerator';

const environment = process.env.TEST_ENV ?? 'sit';
const registeredUser = generateRandomUser();

test('registers a new user successfully', async ({ registrationPage }) => {

  await registrationPage.open();
  await registrationPage.openRegistrationForm();
  await registrationPage.register(registeredUser);
  await registrationPage.expectRegistrationSuccess(registeredUser.username);
  saveRegisteredUser(environment, registeredUser);
});
