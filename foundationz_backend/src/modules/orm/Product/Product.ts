import { Model } from "objection";
import Organization from "@orm/organization/Organization";
import Resource from "@orm/resource/Resource";
import { BaseModel } from "@orm/baseModel";

class Product extends BaseModel {
  id: string;
  name: string;

  resource: Resource;
  organization: Organization;

  static tableName = "products";

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
          from: "products.id",
          to: "resource.productId",
        },
      },
    };
  }
}

export default Product;
