import { Queue } from "bullmq";
import { redisConnection } from "../../config/bullmq.js";
import config from "../../config/config.js";

export const walletQueue = new Queue(config.bullmq.wallet_queue, {connection: redisConnection})
export const emailQueue = new Queue(config.bullmq.email_queue, {connection: redisConnection})
