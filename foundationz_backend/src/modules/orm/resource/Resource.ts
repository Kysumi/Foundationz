import { Model } from "objection";
import Booking from "@orm/booking/Booking";
import Product from "@orm/Product/Product";
import { BaseModel } from "@orm/baseModel";
import Employee from "@orm/employee/Employee";

class Resource extends BaseModel {
  id: string;
  product: Product | null;
  employee: Employee | null;
  bookings: Booking[];

  static tableName = "resources";

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "resources.productId",
          to: "products.id",
        },
      },
      employee: {
        relation: Model.BelongsToOneRelation,
        modelClass: Employee,
        join: {
          from: "resources.employeeId",
          to: "employees.id",
        },
      },
      bookings: {
        relation: Model.ManyToManyRelation,
        modelClass: Booking,
        join: {
          from: "resources.id",
          through: {
            from: "bookingResource.resourceId",
            to: "bookingResource.bookingId",
          },
          to: "bookings.id",
        },
      },
    };
  }
}

export default Resource;
