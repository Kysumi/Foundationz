import { faker } from "@faker-js/faker";
import BaseSeeder from "./baseSeeder.js";
import { v4 } from "uuid";

export default class UserSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
      first_name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
    };
  }
}
