import { createClient, SocketClosedUnexpectedlyError } from "redis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "superseceretness";
let reconnect: NodeJS.Timeout;

export const RedisClient = createClient({
  socket: {
    host: REDIS_HOST,
    port: 6379,
  },

  legacyMode: true,
  password: REDIS_PASSWORD,
});

export const SetupRedisCallbacks = async () => {
  RedisClient.on("error", (err) => {
    if (err.type != SocketClosedUnexpectedlyError) {
      console.error("Redis Client Error: ", err);
    }
  });
  RedisClient.on("ready", () => console.log("Redis is ready to serve."));
  RedisClient.on("reconnecting", () =>
    console.warn("Redis disconnected, attempting to reconnect...")
  );
  RedisClient.on("connect", () => console.log("Redis is connected."));
  RedisClient.on("end", () => RedisReconnect());
  await RedisClient.connect().catch(console.error);
};

const RedisReconnect = async () => {
  await RedisClient.connect().catch(() => {
    if (reconnect === undefined) {
      console.warn("Unable to connect to redis, trying again in 1 second...");
      reconnect = setTimeout(RedisReconnect, 1000);
    }
  });
};
