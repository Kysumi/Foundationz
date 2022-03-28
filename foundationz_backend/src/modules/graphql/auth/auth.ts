import { extendType, nonNull, objectType, stringArg } from "nexus";
import { User } from "@orm/user";
import { validatePassword } from "@auth/crypto";
import { signToken } from "@auth/auth";
import { AuthenticationError } from "apollo-server-express";

export const UserLogin = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("login", {
      type: "UserAuth",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }) => {
        const user = await User.query().where("email", email).first();

        if (!user) {
          throw new AuthenticationError(
            `User with the email ${email} not found!`
          );
        }

        if (validatePassword(user, password)) {
          return [
            {
              id: user.id,
              email: user.email,
              token: signToken(user),
            },
          ];
        }
        throw new AuthenticationError(`Invalid email or password!`);
      },
    });
  },
});

export const UserAuthType = objectType({
  name: "UserAuth",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("email");
    t.nonNull.string("token");
  },
});
