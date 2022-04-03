import { extendType, nonNull, stringArg } from "nexus";
import { createUserService } from "@orm/user/services/CreateUserService";

export const CreateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        firstName: nonNull(stringArg()),
        surname: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, attributes) => createUserService(attributes),
    });
  },
});
