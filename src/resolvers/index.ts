import axios from "axios";
import { prismaClient } from "../lib/db";

const resolvers = {
  Query: {
    hello: () => {
      return "Hey There, I am graphql Server";
    },
    say: (_: any, { name }: { name: string }) => {
      return `Hello, ${name}!`;
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        firstName,
        lastName,
        email,
        password,
      }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }
    ) => {
      await prismaClient.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          salt: "random_salt",
        },
      });
      return true;
    },
  },
};

export default resolvers;
