import { User } from "@orm/user";

export const getUser = async (id: string): Promise<User | undefined> => {
  if (id) {
    return User.query()
      .findById(id)
      .select("id", "first_name", "surname", "email");
  }
  return undefined;
};
