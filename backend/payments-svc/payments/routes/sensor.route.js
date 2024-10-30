import { Router } from "express";
import sensorController from "../controllers/sensor.controller.js";

const sensorRouter = Router()
sensorRouter.post("/data", sensorController.sensorData)

export default sensorRouter