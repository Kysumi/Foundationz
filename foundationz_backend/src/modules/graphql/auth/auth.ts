import { extendType, nonNull, objectType, stringArg } from "nexus";
import { User } from "@orm/user";
import { validatePassword } from "@auth/crypto";
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

export const UserAuthType = objectType({
  name: "UserAuth",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("email");
  },
});

export const StandardMessage = objectType({
  name: "Message",
  definition(t) {
    t.nonNull.string("message");
  },
});

export const UserLogout = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("logout", {
      type: "Message",

      resolve: async (_, {}, context) => {
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
        console.log(context.user);
        return user || [];
      },
    });
  },
});
