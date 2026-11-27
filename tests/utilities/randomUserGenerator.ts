import { RegistrationDetails } from '../dataTypes';
import { faker } from '@faker-js/faker'; 

export function generateRandomUser(): RegistrationDetails{

    const randomSuffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();
    const ssn = faker.string.numeric(9);

    return {
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        phoneNumber,
        ssn,
        username: `test${Date.now().toString().slice(-8)}${randomSuffix}`,
        password: 'Test@1234', // You can generate a random password if needed
    }

}