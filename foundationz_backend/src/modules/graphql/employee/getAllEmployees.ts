import { extendType } from "nexus";
import Employee from "@orm/employee/Employee";

export const GetAllEmployees = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("getAllEmployees", {
      type: "Booking",
      resolve() {
        return Employee.query();
      },
    });
  },
});
