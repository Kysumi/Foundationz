import { extendType, nonNull, stringArg } from "nexus";
import { User } from "@orm/user";
import { validatePassword } from "@auth/crypto";
import { AuthenticationError } from "apollo-server-express";

const error = new AuthenticationError(`Invalid email or password!`);

export const UserLogin = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }, { session, user: ctxUser }) => {
        if (ctxUser) {
          return ctxUser;
        }

        const user = await User.query().where("email", email).first();
        if (!user) {
          throw error;
        }

        if (validatePassword(user, password)) {
          session.userid = user.id;
          session.email = user.email;
          return user;
        }

        throw error;
      },
    });
  },
});

export const UserLogout = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.list.field("logout", {
      type: "Message",

      resolve: async (_, __, context) => {
        if (!context.session.email) {
          throw new AuthenticationError(`You are not signed in!`);
        }

        context.session.destroy(() => {
          context.user = undefined;
        });
        return [
          {
            message: "Logged out",
          },
        ];
      },
    });
  },
});
