import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import prisma from "../config/db.js";
import type { GetUserTokenPayload } from "../types/user.d.ts";
import type { CreateUserPayload } from "../types/user.d.ts";
import type { User } from "../types/user.d.ts";

const userResolver = {
	Query: {
		getUserToken: async (_: any, payload: GetUserTokenPayload) => {
			const { email, password } = payload;

			const user = await prisma.user.findUnique({
				where: {
					email: email
				}
			});

			if (!user) throw new Error("User Not Found");

			const userSalt = user.salt;

			const hashedPassword = createHmac("sha256", userSalt)
				.update(password)
				.digest("hex");

			const userHashPassword = hashedPassword;

			if (userHashPassword !== user.password)
				throw new Error("Incorrect Password");

			// Generate a token

			const token = JWT.sign(
				{
					id: user.id,
					email: user.email
				},
				process.env.JWT_SECRET!
			);

			return token;
		},
		getCurrentLoggedInUser: async (
			_: any,
			parameters: any,
			context: any
		): Promise<User> => {
			if (context?.user) {
				const id = context.user.id;

				const user = await prisma.user.findUnique({
					where: {
						id: id
					}
				});

				if (!user) {
					throw new Error("User not found");
				}
				return {
					...user,
					profileImageURL: user.profileImageURL ?? undefined
				};
			}
			throw new Error("I don't know who are you?");
		}
	},
	Mutation: {
		createUser: async (_: any, payload: CreateUserPayload) => {
			const { firstName, lastName, email, password } = payload;

			const salt = randomBytes(32).toString();

			const hashedPassword = createHmac("sha256", salt)
				.update(password)
				.digest("hex");
			const user = await prisma.user.create({
				data: {
					firstName,
					lastName,
					email,
					salt,
					password: hashedPassword
				}
			});

			return user;
		}
	}
};

export default userResolver;
