import axios from "axios";
import { prismaClient } from "../../lib/db";
import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });

    return token;
  },

  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    // console.log(context);

    if (context && context.user) {
      const id = context.user.id;

      const user = await UserService.getUserById(id);

      return user;
    }
    throw new Error("I don't know who are you?");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const response = await UserService.createUser(payload);

    return response.id;
  },
};

export const resolvers = { queries, mutations };
