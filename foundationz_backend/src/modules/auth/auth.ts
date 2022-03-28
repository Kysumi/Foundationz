import { User } from "@orm/user";

export const signToken = (user: User) => {
  return user.password;
};
