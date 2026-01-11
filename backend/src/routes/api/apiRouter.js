import { Router } from "express";
import productRouter from "./product/productRouter.js";

const apiRouter = Router();

apiRouter.use("/product", productRouter);

export default apiRouter;
