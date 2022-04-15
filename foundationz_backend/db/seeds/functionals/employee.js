import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import BaseSeeder from "./baseSeeder.js";
import { Organizations } from "../seeder.js";

export default class EmployeeSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      organization_id: Organizations.random().id,
    };
  }
}
