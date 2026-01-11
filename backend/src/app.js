import express from "express";
import apiRouter from "./routes/api/apiRouter.js";
const app = express();

app.use("/", express.static("dist"));
app.use("/api", apiRouter);

export default app;
