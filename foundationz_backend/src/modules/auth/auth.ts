import session from "express-session";
import redis_connect from "connect-redis";
import { RedisClient, SetupRedisCallbacks } from "@redis/redis";
//20 minutes
const LIFETIME = 1000 * 60 * 20;
const RedisStore = redis_connect(session);
export const COOKIE_NAME = "foundationz";

export interface SessionData extends session.Session {
  userid: string;
  email: string;
}

export const configuredSession = async () => {
  await SetupRedisCallbacks();
  return session({
    name: COOKIE_NAME,
    secret: process.env.SESSION_SECRET || "superseceretness",
    saveUninitialized: false,
    store: new RedisStore({ client: RedisClient }),
    cookie: {
      httpOnly: true,
      maxAge: LIFETIME,
      secure: process.env.ENV === "production",
    },
    resave: false,
  });
};
