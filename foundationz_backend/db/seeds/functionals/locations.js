import { v4 } from "uuid";
import BaseSeeder from "./baseSeeder.js";

export default class LocationSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
    };
  }
}
