import { Router } from "express";
import saccoController from "../controllers/sacco.controller.js";
import walletController from "../controllers/wallet.controller.js";
const saccoRouter = Router();
saccoRouter.post("/summary", saccoController.accountSummary);
saccoRouter.post("/topup", walletController.topUpWallet);
saccoRouter.post("/topup/history", walletController.topUpHistory);
saccoRouter.post("/transactions/history", saccoController.getTransactions);
saccoRouter.post("/sensor/history", saccoController.getSensorLogs);

export default saccoRouter;
