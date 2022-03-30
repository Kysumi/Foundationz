import sessions from "express-session";

export interface SessionData extends sessions.Session {
  userid: string;
  email: string;
}

//20 minutes
const LIFETIME = 1000 * 60 * 20;

export const configuredSession = () => {
  return sessions({
    name: "foundationz",
    secret: process.env.SESSION_SECRET || "superseceretness",
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: LIFETIME,
      secure: process.env.ENV === "production",
    },
    resave: false,
  });
};
