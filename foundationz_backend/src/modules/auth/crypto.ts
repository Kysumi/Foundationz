import { User } from "@orm/user";
import bcrypt from "bcrypt";

const ROUNDS = 10;

//Returns a tuple of the hashed password and salt key,
// - creates a new salt key if one is not provided
export const hashString = (input: string) => {
  return bcrypt.hash(input, ROUNDS);
};

//Validates input and salt against the specified hash
export const validateHash = (input: string, target: string) => {
  return bcrypt.compareSync(input, target);
};

//Validates the supplied password against the one stored on the user
export const validatePassword = (user: User, password: string) => {
  return validateHash(password, user.password);
};
