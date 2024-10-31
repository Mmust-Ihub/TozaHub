import { Router } from "express";
import sensorController from "../controllers/sensor.controller.js";

const sensorRouter = Router()
sensorRouter.post("/data", sensorController.sensorData)
sensorRouter.post("/test", sensorController.testWorkers)

export default sensorRouter