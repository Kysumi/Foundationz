import { v4 } from "uuid";
import BaseSeeder from "../baseSeeder.js";
import { Bookings, BookingTypes } from "../../seeder.js";
import { faker } from "@faker-js/faker";

export default class AllotmentSeeder extends BaseSeeder {
  generate() {
    const week = Bookings.randomList(this.amount * 4).reduce(
      (current, booking) => {
        const start_date = faker.helpers.randomize([
          faker.date.soon(2),
          faker.date.soon(10),
        ]);
        const end_date = faker.date.future(1);
        return [
          ...current,
          ...this.populateFields(booking, start_date, end_date),
        ];
      },
      []
    );

    const currentDay = Bookings.randomList(this.amount).reduce(
      (current, booking) => {
        const morning = new Date();
        const evening = new Date();

        morning.setHours(8, this.randomNumberPlox(59), 0, 0);
        evening.setHours(16, this.randomNumberPlox(59), 0, 0);

        const toady = faker.date.between(
          morning.toISOString(),
          evening.toISOString()
        );

        const end_date = faker.date.soon(1);

        return [...current, ...this.populateFields(booking, toady, end_date)];
      },
      []
    );

    this.data = [...currentDay, ...week];

    return this;
  }

  populateFields(booking, start, end) {
    return [
      {
        id: v4(),
        booking_id: booking.id,
        organization_id: booking.organization_id,
        type_id: BookingTypes.random().id,
        start_date: start,
        end_date: end,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
  }
}
