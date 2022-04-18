import { objectType } from "nexus";
import Employee from "@orm/employee/Employee";

export const EmployeeType = objectType({
  name: "Employee",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.field("resource", {
      type: "Resource",
      async resolve({ id }) {
        const product = await Employee.query().findById(id);
        return product?.$relatedQuery("resource") || null;
      },
    });
  },
});
