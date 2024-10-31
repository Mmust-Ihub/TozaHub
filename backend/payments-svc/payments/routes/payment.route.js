import { Router } from "express";
import paymentController from "../controllers/payment.controller.js";
import walletController from "../controllers/wallet.controller.js";

const paymentRouter = Router();

paymentRouter.get("/", paymentController.helloWorld);
paymentRouter.post("/wallet", paymentController.createWallet);

export default paymentRouter;
