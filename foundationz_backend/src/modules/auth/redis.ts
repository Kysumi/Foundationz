import { createClient } from "redis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "superseceretness";

export const RedisClient = async () => {
  const client = createClient({
    socket: {
      host: REDIS_HOST,
      port: 6379,
    },
    legacyMode: true,
    password: REDIS_PASSWORD,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();

  return client;
};
