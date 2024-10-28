import { Router } from "express";
import paymentRouter from "./payment.route.js";
import walletRouter from "./wallet.route.js";
// import docsRouter from "./docs.route.js";

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
