import { gql } from "apollo-server-express";

const typeDefs = gql`
  #graphql
  type Query {
    hello: String
    say(name: String): String
  }
`;

export default typeDefs;
