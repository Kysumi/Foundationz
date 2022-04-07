import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
import BaseSeeder from "./baseSeeder.js";

export default class BookingTypeSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
      name: faker.random.word(),
      colour: Math.floor(Math.random() * 16777215).toString(16),
    };
  }
}
