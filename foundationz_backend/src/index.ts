import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { knexSnakeCaseMappers, Model } from "objection";
import knex, { Knex } from "knex";
import { schema } from "./schema";
import cookieParser from "cookie-parser";
import { configuredSession } from "@auth/auth";
import { context } from "@graphql/context";
import cors from "cors";
import { ApolloCookies } from "./modules/plugins/apolloCookies";

// Initialize knex.
const k: Knex = knex({
  client: "pg",
  useNullAsDefault: true,
  connection: process.env.DATABASE_URL,
  ...knexSnakeCaseMappers(),
});

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://studio.apollographql.com",
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};

// Give the knex instance to objection.
Model.knex(k);

async function listen(port: number) {
  const app = express();
  app.use(cors(corsOptions));

  app.set("trust proxy", 1); // trust first proxy -- Apollo studio make it go
  app.use(await configuredSession());
  // app.use(clearCookie);
  app.use(cookieParser());

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      new ApolloCookies(),
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once("listening", resolve).once("error", reject);
  });
}

async function main() {
  try {
    await listen(4000);
    console.log("🚀 Server is ready at http://localhost:4000/graphql");
  } catch (err) {
    console.error("💀 Error starting the node server", err);
  }
}

void main();
