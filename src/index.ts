import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = Number(process.env.PORT) || 8000;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello, World!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
