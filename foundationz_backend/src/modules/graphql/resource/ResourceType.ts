import { objectType } from "nexus";
import Resource from "@orm/resource/Resource";

export const ResourceType = objectType({
  name: "Resource",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.list.nonNull.field("projects", {
      type: "Project",
      async resolve({ id }) {
        const resource = await Resource.query().findById(id);
        return resource?.$relatedQuery("projects") || [];
      },
    });
    // TODO remove i don't think this makes much sense
    t.field("product", {
      type: "Product",
      async resolve({ id }) {
        const resource = await Resource.query().findById(id);
        return resource?.$relatedQuery("product") || null;
      },
    });
  },
});
