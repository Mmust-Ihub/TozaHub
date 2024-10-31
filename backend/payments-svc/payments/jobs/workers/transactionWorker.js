import { Worker } from "bullmq";
import config from "../../config/config.js";
import { redisConnection, removeConfig } from "../../config/bullmq.js";
import logger from "../../config/logger.js";
import { transferMoney } from "../../services/wallet.service.js";
import { transactionModel } from "../../models/transactions.model.js";
import { emailQueue } from "../queues/queue.js";
import { blockList } from "../../utils/utils.js";


const transactionWorker = new Worker(config.bullmq.trans_queue, async(job) => {
  console.log(job.data)
    // await transferMoney("QJ45DZR", "6RNKJER", 1)
    await transferMoney(job.data.wallet_id, "6RNKJER", 1)
    await transactionModel.create({...job.data, "status": "success"})

}, {
  connection: redisConnection,
});

transactionWorker.on("active", (job) => {
    logger.info(`[${job.id}] transaction worker started`)
});

transactionWorker.on("completed", async (job, returnvalue) => {
    logger.info(`[${job.id}] transaction worker completed successfully`)
});

transactionWorker.on("failed", async(job, err) => {
  logger.error(`[${job.id}] transaction worker failed with error: ${err}`);
  await transactionModel.create({...job.data, "status": "failed"})
  await  emailQueue.add("failed", blockList(job.data, ["wallet_id"]), removeConfig)
});

export default transactionWorker