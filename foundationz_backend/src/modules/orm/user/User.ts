import { Model, ModelObject } from "objection";
import Organization from "@orm/organization/Organization";

class User extends Model {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;

  organizations: Organization[];

  static tableName = "users";

  static get relationMappings() {
    return {
      organizations: {
        relation: Model.ManyToManyRelation,
        modelClass: Organization,
        join: {
          from: "users.id",
          through: {
            from: "organizationUser.userId",
            to: "organizationUser.organizationId",
          },
          to: "organizations.id",
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
        email: { type: "string" },
        firstName: { type: "string" },
        surname: { type: "string" },
        password: { type: "string" },
      },
    };
  }
}

export type UserShape = ModelObject<User>;

export default User;
