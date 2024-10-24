import axios from "axios";

const resolvers = {
  Query: {
    hello: () => {
      return "Hey There, I am graphql Server";
    },
    say: (_: any, { name }: { name: string }) => {
      return `Hello, ${name}!`;
    },
  },
};

export default resolvers;
