import { gql } from "apollo-server-express";

export const typeDefs = gql`
  #graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImageURL: String
  }
`;
