import { Request } from "express";
import { User } from "@orm/user";
import { SessionData } from "@auth/auth";
import Loaders from "@loaders/loaders";
import loaders from "@loaders/loaders";

interface CustomRequest extends Request {
  session: SessionData;
}

export interface Context {
  user?: User;
  session: SessionData;
  loaders: typeof Loaders;
}

export const context = async ({ req }: { req: CustomRequest }) => {
  let user: User | undefined;

  if (req.session.userid) {
    user = await loaders.user.byId.load(req.session.userid);
  }
  return {
    user,
    session: req.session,
    loaders: Loaders,
  };
};
