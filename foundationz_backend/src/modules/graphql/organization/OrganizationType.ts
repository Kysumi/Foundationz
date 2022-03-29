import { objectType } from "nexus";

export const OrganizationType = objectType({
  name: "Organization",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      async resolve({ id }, _, context) {
        return await context.loaders.loadsUsersFromOrganisationId.load(id);
      },
    });
  },
});
