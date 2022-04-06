import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import BaseSeeder from "./baseSeeder.js";
import { Organizations } from "../seeder.js";

export default class ContactSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
      first_name: faker.name.firstName(),
      surname: faker.name.lastName(),
      organization_id: Organizations.random().id,
    };
  }
}
