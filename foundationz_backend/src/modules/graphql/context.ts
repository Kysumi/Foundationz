import { Request } from "express";
import { User } from "@orm/user";
import { SessionData } from "@auth/auth";
import Loaders from "@loaders/loaders";
import loaders from "@loaders/loaders";
import cookie from "cookie";

export interface CustomRequest extends Request {
  session: SessionData;
}

export interface CookieData {
  name: string;
  value: string;
  options: cookie.CookieSerializeOptions;
}

export interface Context {
  user?: User;
  session: SessionData;
  loaders: typeof Loaders;
  setCookies: CookieData[];
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
    setCookies: [],
  };
};
