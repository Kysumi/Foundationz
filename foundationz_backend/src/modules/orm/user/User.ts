import { Model, ModelObject } from "objection";
import Organization from "@orm/organization/Organization";

class User extends Model {
  id: string;
  first_name: string;
  surname: string;
  email: string;
  password: string;
  salt:string;
  created_at: Date;
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
            from: "organization_user.user_id",
            to: "organization_user.organization_id",
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
        first_name: { type: "string" },
        surname: { type: "string" },
        salt: { type: "string" },
      },
    };
  }
}

export type UserShape = ModelObject<User>;

export default User;
