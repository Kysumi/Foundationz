import { Model } from "objection";
import { User } from "@orm/user";

class Organization extends Model {
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
            from: "organization_user.organization_id",
            to: "organization_user.user_id",
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
