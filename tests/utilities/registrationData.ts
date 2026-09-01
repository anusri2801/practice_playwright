import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RegistrationDetails } from '../dataTypes';

export type RegistrationFixture = Omit<RegistrationDetails, 'username'> & {
  usernamePrefix: string;
};

export function createRegistrationDetails(fixture: RegistrationFixture): RegistrationDetails {
  const randomSuffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');

  return {
    firstName: fixture.firstName,
    lastName: fixture.lastName,
    address: fixture.address,
    city: fixture.city,
    state: fixture.state,
    zipCode: fixture.zipCode,
    phoneNumber: fixture.phoneNumber,
    ssn: fixture.ssn,
    username: `${fixture.usernamePrefix}${Date.now().toString().slice(-8)}${randomSuffix}`,
    password: fixture.password,
  };
}

export function saveRegisteredUser(environment: string, user: RegistrationDetails): void {
  const filePath = resolve(process.cwd(), 'tests', 'testdata', environment, 'registeredUser.json');
  writeFileSync(filePath, `${JSON.stringify({ username: user.username, password: user.password }, null, 2)}\n`);
}
