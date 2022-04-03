import { extendType, objectType } from "nexus";
import { User } from "@orm/user";

export const GetAllUsers = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("getAllUsers", {
      type: "User",
      resolve() {
        return User.query();
      },
    });
  },
});

export const UserType = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("firstName");
    t.nonNull.string("surname");
    t.nonNull.string("email");
    t.nonNull.list.nonNull.field("organizations", {
      type: "Organization",
      async resolve({ id }, _, context) {
        return await context.loaders.user.organizations.load(id);
      },
    });
  },
});

export const UserAuthType = objectType({
  name: "UserAuth",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("email");
  },
});
