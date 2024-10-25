import axios from "axios";
import { prismaClient } from "../../lib/db";
import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
  hello: () => {
    return "Hey There, I am graphql Server";
  },
  say: (_: any, { name }: { name: string }) => {
    return `Hello, ${name}!`;
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const response = await UserService.createUser(payload);

    return response.id;
  },
};

export const resolvers = { queries, mutations };
