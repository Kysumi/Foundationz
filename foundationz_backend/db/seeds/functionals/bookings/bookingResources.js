import BaseSeeder from "../baseSeeder.js";
import { Bookings, Resources } from "../../seeder.js";

export default class BookingResourceSeeder extends BaseSeeder {
  generate() {
    this.data = Bookings.get().reduce((current, booking) => {
      return [
        ...current,
        {
          booking_id: booking.id,
          resource_id: Resources.random().id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
    }, []);
    return this;
  }
}
