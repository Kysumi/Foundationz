import { extendType, objectType } from "nexus";
import Booking from "@orm/booking/Booking";

export const GetAllBookings = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("getAllBookings", {
      type: "Booking",
      resolve() {
        return Booking.query();
      },
    });
  },
});

export const BookingType = objectType({
  name: "Booking",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.list.nonNull.field("resources", {
      type: "Resource",
      async resolve({ id }) {
        const booking = await Booking.query().findById(id);
        return booking?.$relatedQuery("resources") || [];
      },
    });
  },
});
