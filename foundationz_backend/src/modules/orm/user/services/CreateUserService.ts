import { User } from "@orm/user";
import { v4 } from "uuid";
import { hashString } from "@auth/crypto";
import Joi from "joi";
import { UserInputError } from "apollo-server";

interface CreateUser {
  firstName: string;
  surname: string;
  email: string;
  password: string;
}

interface Schema extends CreateUser {
  id: string;
}

const schema = Joi.object<Schema>({
  id: Joi.string().uuid(),
  password: Joi.string(),
  firstName: Joi.string(),
  surname: Joi.string(),
  email: Joi.string().email(),
});

export const createUserService = async (attributes: CreateUser) => {
  const id = v4();
  const hash = await hashString(attributes.password);

  const user = {
    id,
    ...attributes,
    password: hash,
  };

  const { error } = schema.validate(user, { abortEarly: false });
  if (error) {
    throw new UserInputError("Failed to create user", {
      errors: error.details,
    });
  }

  return User.query().insert(user);
};
