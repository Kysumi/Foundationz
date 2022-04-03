import session from "express-session";
import redis_connect from "connect-redis";
import { RedisClient } from "@auth/redis";

//20 minutes
const LIFETIME = 1000 * 60 * 20;
const RedisStore = redis_connect(session);

export interface SessionData extends session.Session {
  userid: string;
  email: string;
}

export const configuredSession = async () => {
  return session({
    name: "foundationz",
    secret: process.env.SESSION_SECRET || "superseceretness",
    saveUninitialized: false,
    store: new RedisStore({ client: await RedisClient() }),
    cookie: {
      httpOnly: true,
      maxAge: LIFETIME,
      secure: process.env.ENV === "production",
    },
    resave: false,
  });
};
