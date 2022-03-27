import { Model } from "objection";
import Project from "@orm/project/Project";
import Product from "@orm/Product/Product";

class Resource extends Model {
  id: string;
  product: Product | null;
  projects: Project[];

  static tableName = "resources";

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "resources.product_id",
          to: "products.id",
        },
      },
      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: Project,
        join: {
          from: "resources.id",
          through: {
            from: "project_resource.resource_id",
            to: "project_resource.project_id",
          },
          to: "projects.id",
        },
      },
    };
  }
}

export default Resource;
