import { Router } from "express";
import agentController from "../controllers/agent.controller.js";

const agentRouter = Router();

agentRouter.get("/summary", agentController.summary);
agentRouter.get("/saccos/summary", agentController.saccosSummary);
agentRouter.post("/sacco/failed", agentController.saccoFailedTransactions);

export default agentRouter;
