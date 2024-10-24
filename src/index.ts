import { app, startApolloServer } from "./app";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 8000;

const startServer = async () => {
  await startApolloServer();

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
};

startServer();
