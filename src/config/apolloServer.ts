import { ApolloServer } from "@apollo/server";
import userResolver from "../module/UserResolver.js";
import userSchema from "../module/UserSchema.js";

const apolloServer = new ApolloServer({
	typeDefs: userSchema,
	resolvers: userResolver
});

export default apolloServer;
