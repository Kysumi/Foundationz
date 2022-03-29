import sessions from "express-session";

export interface SessionData extends sessions.Session {
  userid: string;
  email: string;
}

//24 hours
const LIFETIME = 1000 * 60 * 60 * 24;

export const configuredSession = () => {
  return sessions({
    name: "foundationz",
    secret: process.env.SESSION_SECRET || "sdfhasergdfbvc",
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: LIFETIME,
      secure: process.env.ENV === "production",
    },
    resave: false,
  });
};
