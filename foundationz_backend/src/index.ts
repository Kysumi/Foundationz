import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import {User} from "./modules/user";
import {Model} from "objection";
import pkg, {Knex} from 'knex';
import { v4 as uuidv4 } from 'uuid';

// Initialize knex.
const k: Knex = pkg({
  client: 'pg',
  useNullAsDefault: true,
  connection: process.env.DATABASE_URL,
});

// Give the knex instance to objection.
Model.knex(k);

const typeDefs = gql`
  type Query {
    hello: String
    whoAmI: User
  }

  type User {
    id: String
    name: String
    email: String
  }
`;

const resolvers = {
  Query: {
    async whoAmI() {
      await User.query().insert({
        id: uuidv4(),
        name: 'Bleh'
      });

      const allUsers = await User.query().first();
      console.log(allUsers)
    },
  },
};

async function listen(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
