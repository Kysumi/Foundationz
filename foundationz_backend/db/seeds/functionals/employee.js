import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import BaseSeeder from "./baseSeeder.js";

export default class EmployeeSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    };
  }
}
