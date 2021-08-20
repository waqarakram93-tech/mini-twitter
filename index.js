import "dotenv/config.js";
import express from "express";
import cors from "cors";
import postsRouter from "./routes/postsRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import "./db/test.js";

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  const morgan = await import("morgan");
  app.use(morgan.default("dev"));
}
app.use(cors());
app.use(express.json());
app.use("/posts", postsRouter);
app.use('/abc', (req, res) => res.status(200).json({ mongo: process.env.MONGO_URI }))
app.all('*', (req, res) => res.status(404).json({ error: 'Not found' }));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
