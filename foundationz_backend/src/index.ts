import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

const prisma = new PrismaClient()

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
      const allUsers = await prisma.user.findMany()
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
  } finally {
    await prisma.$disconnect()
  }
}

void main();
