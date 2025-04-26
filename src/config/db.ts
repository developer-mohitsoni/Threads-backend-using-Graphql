import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient({
	log: ["query", "info"]
});

export default prisma;
