import { Request } from "express";
import { getUser } from "@auth/getUser";
import { User } from "@orm/user";
import { SessionData } from "@auth/auth";

interface CustomRequest extends Request {
  session: SessionData;
}

export interface Context {
  user?: User;
  session: SessionData;
}

export const context = async ({
  req,
}: {
  req: CustomRequest;
}): Promise<Context> => {
  let user = undefined;

  if (req.session.userid) {
    user = await getUser(req.session.userid);
  }
  return {
    user,
    session: req.session,
  };
};
