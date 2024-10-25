import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { gql } from "apollo-server-express";

export const createApolloGraphqlServer = async () => {
  const gqlServer = new ApolloServer({
    typeDefs: gql`
      #graphql
      ${User.typeDefs}

      type Query {
        ${User.queries}
      }
      
      type Mutation {
        ${User.mutations}
      }
    `, // Schema

    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  // Start the gql Server

  await gqlServer.start();

  return gqlServer;
};
