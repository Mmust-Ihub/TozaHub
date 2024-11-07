import { Router } from "express";
import saccoController from "../controllers/sacco.controller.js";
import walletController from "../controllers/wallet.controller.js";
const saccoRouter = Router();
saccoRouter.post("/balance", saccoController.accountBalance);
saccoRouter.post("/topup", walletController.topUpWallet);
saccoRouter.post("/topup/history", walletController.topUpHistory);

export default saccoRouter;
