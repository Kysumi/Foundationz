import { extendType, nonNull, stringArg } from "nexus";
import { User } from "@orm/user";
import { v4 } from "uuid";
import { hashString } from "@auth/crypto";

export const CreateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        first_name: nonNull(stringArg()),
        surname: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { first_name, surname, email, password }) => {
        const id = v4();
        const hash = await hashString(password);

        return User.query().insert({
          id: id,
          first_name: first_name,
          surname: surname,
          email: email,
          password: hash,
          created_at: new Date(),
        });
      },
    });
  },
});
