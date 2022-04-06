import { v4 } from "uuid";
import BaseSeeder from "../baseSeeder.js";
import { Bookings, BookingTypes } from "../../seeder.js";
import { faker } from "@faker-js/faker";

export default class AllotmentSeeder extends BaseSeeder {
  generate() {
    this.data = Bookings.randomList(this.amount).reduce((current, booking) => {
      const start_date = faker.helpers.randomize([
        faker.date.past(1),
        faker.date.soon(10),
      ]);
      const end_date = faker.date.future(1);
      return [
        ...current,
        {
          id: v4(),
          booking_id: booking.id,
          organization_id: booking.organization_id,
          type_id: BookingTypes.random().id,
          start_date: start_date,
          end_date: end_date,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
    }, []);
    return this;
  }
}
