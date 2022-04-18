import { Model } from "objection";
import Resource from "@orm/resource/Resource";
import { BaseModel } from "@orm/baseModel";

class Booking extends BaseModel {
  id: string;
  name: string;

  resources: Resource[];

  static tableName = "bookings";

  static get relationMappings() {
    return {
      resources: {
        relation: Model.ManyToManyRelation,
        modelClass: Resource,
        join: {
          from: "bookings.id",
          through: {
            from: "bookingResource.bookingId",
            to: "bookingResource.resourceId",
          },
          to: "resources.id",
        },
      },
    };
  }
}

export default Booking;
