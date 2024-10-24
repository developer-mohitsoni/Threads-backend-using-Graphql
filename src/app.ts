import express, { Application, Request, Response } from "express";

import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import apolloServer from "./myApolloServer/apolloServer";

export const app: Application = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Start the ApolloServer
export const startApolloServer = async () => {
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));
};
