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
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.list.nonNull.field("organization", {
      type: "Organization",
      async resolve({ id }) {
        const user = await User.query().findById(id);
        return user?.$relatedQuery("organizations") || [];
      },
    });
  },
});
