import { readFileSync } from "node:fs";

const userSchema = readFileSync("user.graphql", "utf-8");

export default userSchema;
