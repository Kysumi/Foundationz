import { extendType, nonNull, stringArg } from "nexus";
import { User } from "@orm/user";
import { validatePassword } from "@auth/crypto";
import { AuthenticationError } from "apollo-server-express";

export const UserLogin = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.list.field("login", {
      type: "UserAuth",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }, { session }) => {
        if (session.email) {
          throw new AuthenticationError(`You are already signed in!`);
        }
        const user = await User.query().where("email", email).first();
        if (!user) {
          throw new AuthenticationError(
            `User with the email ${email} not found!`
          );
        }
        if (validatePassword(user, password)) {
          session.userid = user.id;
          session.email = user.email;
          return [
            {
              id: user.id,
              email: user.email,
            },
          ];
        }
        throw new AuthenticationError(`Invalid email or password!`);
      },
    });
  },
});

export const UserLogout = extendType({
  type: "Query",
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
