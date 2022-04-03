import { Model } from "objection";
import Organization from "@orm/organization/Organization";
import Resource from "@orm/resource/Resource";

class Product extends Model {
  id: string;
  name: string;
  createdAt: Date;
  updateAt: Date;

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
