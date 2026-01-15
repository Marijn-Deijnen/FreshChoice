import { Router } from "express";
import productRouter from "./product/productRouter.js";
import leveringRouter from "./levering/leveringRouter.js";

const apiRouter = Router();

apiRouter.use("/product", productRouter);
apiRouter.use("/levering", leveringRouter);

export default apiRouter;
