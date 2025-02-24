import { Router } from "express";
import agentRouter from "./agent.route.js";
import walletRouter from "./wallet.route.js";
import sensorRouter from "./sensor.route.js";
import adminRouter from "./admin.route.js";
import saccoRouter from "./sacco.route.js";

const router = Router();
const defaultRoutes = [
  {
    path: "/agent",
    route: agentRouter,
  },
  {
    path: "/wallet",
    route: walletRouter,
  },
  {
    path: "/sensor",
    route: sensorRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
  {
    path: "/sacco",
    route: saccoRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
