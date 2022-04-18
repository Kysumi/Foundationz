import { Model } from "objection";
import { User } from "@orm/user";
import { BaseModel } from "@orm/baseModel";
import Resource from "@orm/resource/Resource";

class Organization extends BaseModel {
  id: string;
  name: string;
  email: string;

  users: User[];
  resources: Resource[];

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
      resources: {
        relation: Model.HasManyRelation,
        modelClass: Resource,
        join: {
          from: "organizations.id",
          to: "resources.organization_id",
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
