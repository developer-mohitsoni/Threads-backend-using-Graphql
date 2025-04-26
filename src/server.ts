import { expressMiddleware } from "@apollo/server/express4";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import { createApolloGraphqlServer } from "./graphql";

import bodyParser from "body-parser";
import cors from "cors";

import "dotenv/config";
import UserService from "./services/user";

const init = async () => {
	const app: Application = express();

	app.use(bodyParser.json());
	app.use(express.json());
	app.use(cors());

	const PORT = Number(process.env.PORT) || 8000;

	app.get("/", (req: Request, res: Response) => {
		res.json({
			message: "Hello Graphql",
		});
	});

	const gqlServer = await createApolloGraphqlServer();

	app.use(
		"/graphql",
		expressMiddleware(gqlServer, {
			context: async ({ req }) => {
				// @ts-ignore
				const token = req.headers.authorization;

				// console.log(token);

				try {
					const user = UserService.decodeJWTToken(token as string);

					return { user };
				} catch (error) {
					return {};
				}
			},
		}),
	);

	app.listen(PORT, () => {
		console.log(`Server is running at http://localhost:${PORT}/graphql`);
	});
};

init();
