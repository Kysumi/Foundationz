import BaseSeeder from "./baseSeeder.js";
import { Employees, Locations, Organizations, Products } from "../seeder.js";
import { v4 } from "uuid";

export default class ResourceSeeder extends BaseSeeder {
  generate() {
    const productAmount = this.randomNumberPlox();
    const locationAmount = this.randomNumberPlox();
    const employeeAmount = this.randomNumberPlox();

    const productData = Array.from(Array(productAmount)).map(() => {
      return {
        ...this.fields(),
        product_id: Products.random().id,
        organization_id: Organizations.random().id,
      };
    });

    const locationData = Array.from(Array(locationAmount)).map(() => {
      return {
        ...this.fields(),
        location_id: Locations.random().id,
        organization_id: Organizations.random().id,
      };
    });

    const employeeData = Array.from(Array(employeeAmount)).map(() => {
      return {
        ...this.fields(),
        employee_id: Employees.random().id,
        organization_id: Organizations.random().id,
      };
    });

    this.data = [...locationData, ...employeeData, ...productData];
    return this;
  }

  fields() {
    return {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
