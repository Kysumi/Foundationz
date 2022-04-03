import { Model } from "objection";
import Resource from "@orm/resource/Resource";

class Project extends Model {
  id: string;
  name: string;
  createdAt: Date;
  updateAt: Date;

  resources: Resource[];

  static tableName = "projects";

  static get relationMappings() {
    return {
      resources: {
        relation: Model.ManyToManyRelation,
        modelClass: Resource,
        join: {
          from: "projects.id",
          through: {
            from: "projectResource.projectId",
            to: "projectResource.resourceId",
          },
          to: "resources.id",
        },
      },
    };
  }
}

export default Project;
