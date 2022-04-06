import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import { Organizations } from "../seeder.js";
import BaseSeeder from "./baseSeeder.js";

export default class ProductSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
      created_at: new Date(),
      name: faker.commerce.productName(),
      organization_id: Organizations.random().id,
    };
  }
}
