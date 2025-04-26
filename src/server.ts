import express, {
	type Application,
	type Request,
	type Response
} from "express";
import "dotenv/config";
import { startStandaloneServer } from "@apollo/server/standalone";
import cors from "cors";
import JWT from "jsonwebtoken";
import apolloServer from "./config/apolloServer.js";

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.json({
		status: 200,
		message: "App is working"
	});
});

const { url } = await startStandaloneServer(apolloServer, {
	listen: {
		port: 4000
	},
	context: async ({ req }) => {
		const token = req.headers.authorization;

		// console.log(token);

		try {
			const user = JWT.verify(
				token as string,
				process.env.JWT_SECRET as string
			);

			return { user };
		} catch (error) {
			return {};
		}
	}
});

console.log(`Apollo Server started at ${url}`);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
