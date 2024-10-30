import { Router } from "express";
import paymentRouter from "./payment.route.js";
import walletRouter from "./wallet.route.js";
import sensorRouter from "./sensor.route.js";
import adminRouter from "./admin.route.js";

const router = Router();
const defaultRoutes = [
  {
    path: "/payment",
    route: paymentRouter,
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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
