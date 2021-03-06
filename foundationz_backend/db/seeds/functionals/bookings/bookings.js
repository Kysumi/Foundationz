import { v4 } from "uuid";
import BaseSeeder from "../baseSeeder.js";
import { Contacts, Locations, Organizations } from "../../seeder.js";

export default class BookingSeeder extends BaseSeeder {
  fields() {
    return {
      id: v4(),
      contact_id: Contacts.random().id,
      organization_id: Organizations.random().id,
      location_resource: Locations.random().id,
    };
  }
}
