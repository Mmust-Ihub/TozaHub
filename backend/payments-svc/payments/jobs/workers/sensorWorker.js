import { Worker } from "bullmq";
import axios from "axios";
import config from "../../config/config.js";
import { redisConnection, removeConfig } from "../../config/bullmq.js";
import logger from "../../config/logger.js";
import { sensorModel } from "../../models/sensor.model.js";
import { walletModel } from "../../models/wallet.model.js";
import { blockList } from "../../utils/utils.js";
import { transQueue } from "../queues/queue.js";

const loginAdmin = async () => {
  const body = {
    username: config.auth.username,
    password: config.auth.password,
  };
  const response = await axios.post(config.auth.auth_url, body);
  const { access } = response.data;
  return access;
};

const getVehicleInfo = async (number_plate) => {
  const token = await loginAdmin();
  const url = `${config.auth.vehicl_url}/${number_plate}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
  const response = await axios.get(url, { headers });
  const { name, email, wallet_id } = await walletModel.findOne({
    name: response.data.sacco,
  });
  return {name, email, number_plate, wallet_id}
};

const sensorWorker = new Worker(config.bullmq.sensor_queue, async(job) => {
  const details = await getVehicleInfo(job.data.plate)
  console.log(details)
    await sensorModel.create(blockList(details, ["wallet_id"]));
    return {...details, "amount": 1}
}, {
connection: redisConnection,
});

sensorWorker.on("active", (job) => {
  logger.info(`[${job.id}] sensor data processing started `);
});

sensorWorker.on("completed", async (job, result) => {
  logger.info(`[${job.id}] sensor data processing  completed successfully`);
  await transQueue.add("transaction", result, removeConfig)
});

sensorWorker.on("failed", async(job, err) => {
  logger.error(`[${job.id}] sensor data processing failed with error: ${err}`);
});

export default sensorWorker

