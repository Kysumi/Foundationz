import { Model } from "objection";
import Project from "@orm/project/Project";
import Product from "@orm/Product/Product";
import { BaseModel } from "@orm/baseModel";

class Resource extends BaseModel {
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
          from: "resources.productId",
          to: "products.id",
        },
      },
      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: Project,
        join: {
          from: "resources.id",
          through: {
            from: "projectResource.resourceId",
            to: "projectResource.projectId",
          },
          to: "projects.id",
        },
      },
    };
  }
}

export default Resource;
