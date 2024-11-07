import {Router} from "express"
import adminController from "../controllers/admin.controller.js"
const adminRouter = Router()
adminRouter.get("/revenue", adminController.totalRevenue)
adminRouter.get("/summary", adminController.adminSummary)
adminRouter.get("/balance", adminController.accountBalance)
adminRouter.post("/withdraw", adminController.withdrawBalance)

export default adminRouter