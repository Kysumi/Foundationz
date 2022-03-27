import { extendType, objectType } from "nexus";
import Project from "@orm/project/Project";

export const GetAllProjects = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("getAllProjects", {
      type: "Project",
      resolve() {
        return Project.query();
      },
    });
  },
});

export const ProjectType = objectType({
  name: "Project",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.list.nonNull.field("resources", {
      type: "Resource",
      async resolve({ id }) {
        const project = await Project.query().findById(id);
        return project?.$relatedQuery("resources") || [];
      },
    });
  },
});
