import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import BaseSeeder from "../baseSeeder.js";

export default class OrganizationSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
      name: faker.company.companyName(),
    };
  }
}
