import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RegistrationDetails } from '../dataTypes';

export function saveRegisteredUser(environment: string, user: RegistrationDetails): void {
  const filePath = resolve(process.cwd(), 'tests', 'testdata', environment, 'registeredUser.json');
  writeFileSync(filePath, `${JSON.stringify({ username: user.username, password: user.password }, null, 2)}\n`);
}
