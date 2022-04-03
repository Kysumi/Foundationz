import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { knexSnakeCaseMappers, Model } from "objection";
import knex, { Knex } from "knex";
import { schema } from "./schema";
import { context } from "@graphql/context";

// Initialize knex.
const k: Knex = knex({
  client: "pg",
  useNullAsDefault: true,
  connection: process.env.DATABASE_URL,
  ...knexSnakeCaseMappers(),
});

// Give the knex instance to objection.
Model.knex(k);

async function listen(port: number) {
  const app = express();

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

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
