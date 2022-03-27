import { Model } from "objection";
import Organization from "@orm/organization/Organization";
import Resource from "@orm/resource/Resource";

class Product extends Model {
  id: string;
  name: string;
  created_at: Date;
  update_at: Date;

  resource: Resource;
  organization: Organization;

  static tableName = "products";

  static get relationMappings() {
    return {
      organization: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organization,
        join: {
          from: "products.organization_id",
          to: "organization.id",
        },
      },
      resource: {
        relation: Model.HasOneRelation,
        modelClass: Resource,
        join: {
          from: "products.id",
          to: "resource.product_id",
        },
      },
    };
  }
}

export default Product;
