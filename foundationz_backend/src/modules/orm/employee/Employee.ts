import { Model } from "objection";
import Resource from "@orm/resource/Resource";
import { BaseModel } from "@orm/baseModel";
import Organization from "@orm/organization/Organization";

class Employee extends BaseModel {
  id: string;
  name: string;

  resource: Resource;
  organization: Organization;

  static tableName = "employees";

  static get relationMappings() {
    return {
      organization: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organization,
        join: {
          from: "products.organizationId",
          to: "organization.id",
        },
      },
      resource: {
        relation: Model.HasOneRelation,
        modelClass: Resource,
        join: {
          from: "employee.id",
          to: "resource.employeeId",
        },
      },
    };
  }
}

export default Employee;
