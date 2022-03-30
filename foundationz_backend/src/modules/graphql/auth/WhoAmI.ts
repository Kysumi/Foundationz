import { extendType } from "nexus";
import { AuthenticationError } from "apollo-server-express";
import { User } from "@orm/user";

export const WhoAmI = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("whoAmI", {
      type: "User",

      resolve: async (_, {}, context) => {
        if (!context.session.email) {
          throw new AuthenticationError(`You are not signed in!`);
        }
        const user = await User.query().where("id", context.session.userid);
        if (!user) {
          throw new AuthenticationError(`You are not signed in!`);
        }
        return user || [];
      },
    });
  },
});
