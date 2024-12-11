import { Queue } from "bullmq";
import { redisConnection } from "../../config/bullmq.js";
import config from "../../config/config.js";

export const walletQueue = new Queue(config.bullmq.wallet_queue, {connection: redisConnection})
export const sensorQueue = new Queue(config.bullmq.sensor_queue, {connection: redisConnection})
export const transQueue = new Queue(config.bullmq.trans_queue, {connection: redisConnection})
export const emailQueue = new Queue(config.bullmq.email_queue, {connection: redisConnection})
export const topUpQueue = new Queue(config.bullmq.topup_queue, {connection: redisConnection})
