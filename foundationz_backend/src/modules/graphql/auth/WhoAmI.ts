import { extendType } from "nexus";
import { AuthenticationError } from "apollo-server-express";

export const WhoAmI = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("whoAmI", {
      type: "User",

      resolve: async (_, {}, { session, loaders }) => {
        if (!session.userid) {
          throw new AuthenticationError(`You are not signed in!`);
        }
        const user = await loaders.user.byId.load(session.userid);
        if (!user) {
          throw new AuthenticationError(`You are not signed in!`);
        }

        return user;
      },
    });
  },
});
