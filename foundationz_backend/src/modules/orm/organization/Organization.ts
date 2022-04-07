import { Model } from "objection";
import { User } from "@orm/user";
import { BaseModel } from "@orm/baseModel";

class Organization extends BaseModel {
  id: string;
  name: string;
  email: string;

  users: User[];

  static tableName = "organizations";

  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "organizations.id",
          through: {
            from: "organization_user.organizationId",
            to: "organization_user.userId",
          },
          to: "users.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    };
  }
}

export default Organization;
