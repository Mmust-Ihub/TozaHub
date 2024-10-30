import {Router} from "express"
import adminController from "../controllers/admin.controller.js"
const adminRouter = Router()
adminRouter.get("/summary", adminController.adminSummary)

export default adminRouter