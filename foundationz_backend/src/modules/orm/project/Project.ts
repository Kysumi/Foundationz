import { Model } from "objection";
import { User } from "../user";
import Resource from "@orm/resource/Resource";

class Project extends Model {
  id: string;
  name: string;
  created_at: Date;
  update_at: Date;

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
            from: "project_resource.project_id",
            to: "project_resource.resource_id",
          },
          to: "resources.id",
        },
      },
    };
  }
}

export default Project;
